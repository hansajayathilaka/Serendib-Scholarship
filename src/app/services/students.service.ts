import {Injectable} from '@angular/core';
import {
    addDoc,
    collection,
    collectionData,
    doc, docData,
    Firestore,
    limit,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where
} from "@angular/fire/firestore";
import {CollectionReference} from "@firebase/firestore";
import {FnResponse, Sponsor, Student} from "../types";
import {combineLatest, firstValueFrom, map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    constructor(
        private firestore: Firestore,
    ) {
    }

    getAllStudents() {
        const studentsRef = collection(this.firestore, 'Students') as CollectionReference<Student>;
        const q1Student = query(studentsRef, where('_Deleted', '==', false), where('IsActive', '==', true));
        const $students = collectionData(q1Student, {idField: '_ID'}) as Observable<Student[]>;

        const sponsorsRef = collection(this.firestore, 'Sponsors') as CollectionReference<Sponsor>;
        const q1Sponsors = query(sponsorsRef);
        const $sponsors = collectionData(q1Sponsors, {idField: '_ID'}) as Observable<Sponsor[]>;

        return combineLatest([$students, $sponsors]).pipe(
            map(([students, sponsors]: [Student[], Sponsor[]]): Student[] => {
                for (let student of students) {
                    if (student._Sponsor){
                        student.Sponsor = sponsors.find(sponsor => String(sponsor._ID) === student._Sponsor?.id);
                    }
                }
                return students;
            })
        );
    }



    getAllStudentsWithoutFilter() {
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

    async getStudent(id: string) {
        try {
            const studentRef = doc(this.firestore, 'Students', id);
            let data = await firstValueFrom(docData(studentRef, {idField: '_ID'}))
            return {
                status: true,
                message: "Student updated successfully",
                data: data as Student
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

    async nextStudentId(): Promise<string> {
        try {
            const studentsRef = collection(this.firestore, 'Students');
            const q1 = query(studentsRef);
            const students = await firstValueFrom(collectionData(q1, {idField: '_ID'})) as Student[];
            if (students.length === 0) {
                return '2001';
            }
            const studentIds = [];
            for (const student of students) {
                const studentId = Number(student.ID);
                if (!isNaN(studentId)) {
                    studentIds.push(studentId);
                }
            }
            const nextSttudentId = Math.max(...studentIds) + 1;
            return nextSttudentId.toString();
        } catch (e) {
            console.log(e);
            return '-2001';
        }
    }
}
