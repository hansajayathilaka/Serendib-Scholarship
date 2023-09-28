import {Injectable} from '@angular/core';
import {
    addDoc,
    collection,
    collectionData,
    doc,
    Firestore,
    query,
    setDoc,
    updateDoc,
    where
} from "@angular/fire/firestore";
import {CollectionReference} from "@firebase/firestore";
import {FnResponse, Student} from "../types";
import {combineLatest, map, Observable} from "rxjs";
import {SponsorsService} from "./sponsors.service";

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    constructor(
        private firestore: Firestore,
        private sponsorsService: SponsorsService,
    ) {
    }

    getAllStudents() {
        const studentsRef = collection(this.firestore, 'Students') as CollectionReference<Student>;
        const q1 = query(studentsRef, where('_Deleted', '==', false), where('IsActive', '==', true));
        const $students = collectionData(q1, {idField: '_ID'}) as Observable<Student[]>;
        const $sponsors = this.sponsorsService.getAllSponsors();
        return combineLatest([$students, $sponsors]).pipe(
            map(([students, sponsors]): Student[] => {
                for (let student of students) {
                    if (student._Sponsor){
                        student.Sponsor = sponsors.find(sponsor => String(sponsor._ID) === student._Sponsor?.id);
                    }
                }
                return students;
            })
        );
    }

    getAllStudentsDebug() {
        const studentsRef = collection(this.firestore, 'Students');
        const q1 = query(studentsRef);
        return collectionData(q1, {idField: '_ID'}) as Observable<Student[]>;
    }

    async createStudent(student: Student): Promise<FnResponse> {
        try {
            student._Deleted = false;
            const studentsRef = collection(this.firestore, 'Students');
            delete student._ID;
            const res = await addDoc(studentsRef, student);
            return {
                status: true,
                message: "Student added successfully",
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

    async updateStudent(student: Student): Promise<FnResponse> {
        try {
            const studentRef = doc(this.firestore, `Students/${student._ID}`);
            delete student._ID;
            await setDoc(studentRef, student);
            return {
                status: true,
                message: "Student updated successfully",
                data: student
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

    async deleteStudent(student: Student): Promise<FnResponse> {
        try {
            if (!student._ID) {
                throw new Error("Student ID is missing");
            }
            const studentRef = doc(this.firestore, `Students/${student._ID}`);
            await updateDoc(studentRef, {
                _Deleted: true
            });
            return {
                status: true,
                message: "Student deleted successfully",
                data: student
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
}
