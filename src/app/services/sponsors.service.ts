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
import {FnResponse, Sponsor} from "../types";
import {CollectionReference, DocumentReference} from "@firebase/firestore";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SponsorsService {

    constructor(
        private firestore: Firestore,
    ) {
    }

    getAllSponsors() {
        const sponsorsRef = collection(this.firestore, 'Sponsors') as CollectionReference<Sponsor>;
        const q1 = query(sponsorsRef, where('_Deleted', '==', false), where('IsActive', '==', true));
        return collectionData(q1, {idField: '_ID'}) as Observable<Sponsor[]>;
    }

    getAllSponsorsWithoutFilter() {
        const sponsorsRef = collection(this.firestore, 'Sponsors');
        const q1 = query(sponsorsRef);
        return collectionData(q1, {idField: '_ID'}) as Observable<Sponsor[]>;
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
        debugger;
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

    getRef(sponsor?: Sponsor) {
        debugger
        if (!sponsor) {
            return doc(this.firestore, `Sponsors/`) as DocumentReference<Sponsor>;
        }
        return doc(this.firestore, `Sponsors/${sponsor._ID}`) as DocumentReference<Sponsor>;
    }

    getSponsorByRef(sponsorRef: DocumentReference<Sponsor>) {
        return docData(sponsorRef, {idField: '_ID'}) as Observable<Sponsor>;
    }
}
