import {Injectable} from '@angular/core';
import {
    addDoc,
    collection,
    collectionData,
    doc, docData,
    Firestore,
    query,
    setDoc,
    updateDoc,
    where
} from "@angular/fire/firestore";
import {FnResponse, Sponsor, Student} from "../types";
import {CollectionReference, DocumentReference} from "@firebase/firestore";
import {combineLatest, first, firstValueFrom, map, Observable} from "rxjs";
import {StudentsService} from "./students.service";

@Injectable({
    providedIn: 'root'
})
export class SponsorsService {

    constructor(
        private firestore: Firestore,
        private studentsService: StudentsService,
    ) {
    }

    getAllSponsors() {
        const sponsorsRef = collection(this.firestore, 'Sponsors') as CollectionReference<Sponsor>;
        const q1 = query(sponsorsRef, where('_Deleted', '==', false), where('IsActive', '==', true));
        const $sponsors = collectionData(q1, {idField: '_ID'}) as Observable<Sponsor[]>;

        const $students = this.studentsService.getAllStudents();

        return combineLatest([$sponsors, $students]).pipe(
            map(([sponsors, students]: [Sponsor[], Student[]]): Sponsor[] => {
                students.forEach((student) => {
                    if (student.Sponsor) {
                        const sponsor = sponsors.find(sponsor => String(sponsor._ID) === String(student.Sponsor?._ID));
                        if (sponsor) {
                            if (sponsor.Students == undefined) {
                                sponsor.Students = [];
                            }
                            sponsor.Students.push(student);
                        }
                    }
                });
                return sponsors;
            })
        );

    }

    async createSponsor(sponsor: Sponsor): Promise<FnResponse> {
        try {
            sponsor._Deleted = false;
            const sponsorsRef = collection(this.firestore, 'Sponsors');
            delete sponsor._ID;
            const res = await addDoc(sponsorsRef, sponsor);
            return {
                status: true,
                message: "Sponsor added successfully",
                data: res
            }
        } catch (e) {
            console.log(e);
            return {
                status: false,
                message: (e as Error).message,
                data: e
            }
        }
    }

    async updateSponsor(sponsor: Sponsor): Promise<FnResponse> {
        try {
            if (!sponsor._ID) {
                throw new Error("Sponsor ID is missing");
            }
            const sponsorRef = doc(this.firestore, `Sponsors/${sponsor._ID}`);
            delete sponsor._ID;
            const res = await setDoc(sponsorRef, sponsor);
            return {
                status: true,
                message: "Sponsor updated successfully",
                data: res
            }
        } catch (e) {
            console.log(e);
            return {
                status: false,
                message: (e as Error).message,
                data: e
            }
        }
    }

    async deleteSponsor(sponsor: Sponsor): Promise<FnResponse> {
        try {
            if (!sponsor._ID) {
                throw new Error("Sponsor ID is missing");
            }
            const sponsorRef = doc(this.firestore, `Sponsors/${sponsor._ID}`);
            await updateDoc(sponsorRef, {
                _Deleted: true
            });
            return {
                status: true,
                message: "Sponsor deleted successfully",
                data: sponsor
            }
        } catch (e) {
            console.log(e);
            return {
                status: false,
                message: (e as Error).message,
                data: e
            }
        }
    }

    getRef(sponsor?: Sponsor | "NONE") {
        if (sponsor === "NONE" || !sponsor) {
            return doc(this.firestore, `Sponsors/NONE`) as DocumentReference<Sponsor>;
        }
        return doc(this.firestore, `Sponsors/${sponsor._ID}`) as DocumentReference<Sponsor>;
    }

    getSponsorByRef(sponsorRef: DocumentReference<Sponsor>) {
        return docData(sponsorRef, {idField: '_ID'}) as Observable<Sponsor>;
    }

    async nextSponsorId() {
        const sponsorsRef = collection(this.firestore, 'Sponsors') as CollectionReference<Sponsor>;
        const q1 = query(sponsorsRef);
        const sponsors = await firstValueFrom(collectionData(q1, {idField: '_ID'})) as Sponsor[];
        if (sponsors.length === 0) {
            return '1001';
        }
        const sponsorIds = [];
        for(const sponsor of sponsors) {
            const sponsorId = Number(sponsor.ID);
            if (!isNaN(sponsorId)) {
                sponsorIds.push(sponsorId);
            }
        }
        const nextSponsorId = Math.max(...sponsorIds) + 1;
        return nextSponsorId.toString();
    }
}
