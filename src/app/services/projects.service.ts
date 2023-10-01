import { Injectable } from '@angular/core';
import {
    collection,
    collectionData,
    doc,
    docData,
    Firestore,
    getDoc,
    query,
    setDoc,
    where
} from "@angular/fire/firestore";
import { catchError, firstValueFrom, from, Observable, switchMap, throwError, zip } from "rxjs";
import { map } from "rxjs/operators";
import { FnResponse, Project, Tag } from "../types";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { DocumentReference } from "@firebase/firestore";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(
        private firestore: Firestore,
        private functions: Functions,
    ) {
    }

    public GetProject(projectID: string): Observable<Project> {
        const projectRef = doc(this.firestore, 'Projects', projectID);
        return docData(projectRef, {idField: 'ID'}) as Observable<Project>;
    }

    GetAllProjects(): Observable<Project[]> {
        const projectRef = collection(this.firestore, 'Projects');
        const q1 = query(projectRef, where('IsActive', '==', true));

        return (collectionData(q1, {idField: 'ID'}) as Observable<Project[]>).pipe(
            catchError((err) => {
                console.error(err);
                return throwError(err);
            })
        );
    }


    public async CreateProject(data: Project) {
        // Check duplicate project ID
        const projectId = data.ID;
        const _data: any = {...data};
        delete _data.ID;
        const projectRef = doc(this.firestore, 'Projects', projectId);
        try {
            const projectDoc = await getDoc(projectRef);
            if (projectDoc.exists()) {
                const err = Error("Duplicate Project ID");
                console.error(err);
                return {
                    status: false,
                    message: err.message,
                    data: err,
                }
            }
        } catch (err) {
            console.error(err);
        }

        // Handle Tag reference
        if (_data.Tag !== undefined && _data.Tag.ID !== undefined) {
            _data._Tag = doc(this.firestore, 'Tags', _data.Tag.ID) as DocumentReference<Tag>;
        } else {
            delete _data._Tag;
        }
        delete _data.Tag;

        const res = await setDoc(projectRef, _data).then((res) => {
            console.log(res);
            return {
                status: true,
                message: 'Project created successfully.',
                data: null,
            };
        }).catch((err) => {
            console.error(err);
            return {
                status: false,
                message: err.message,
                data: err,
            };
        });
        return res;
    }

    public UpdateProject(data: Project) {
        const projectId = data.ID;
        const _data: any = data;
        delete _data.ID;

        // Handle Tag reference
        if (_data.Tag !== undefined) {
            _data._Tag = doc(this.firestore, `Tags/${_data.Tag.ID}`) as DocumentReference<Tag>;
        }
        delete _data.Tag;

        const projectRef = doc(this.firestore, `Projects/${projectId}`);
        return setDoc(projectRef, _data).then((doc) => {
            console.log(doc);
            return {
                status: true,
                message: 'Project updated successfully.',
                data: null,
            };
        }).catch((err) => {
            console.error(err);
            return {
                status: false,
                message: err.message,
                data: err,
            };
        });
    }

    public async DeleteProject(projectID: string): Promise<FnResponse> {
        const deleteProject = httpsCallable<{ projectID: string }, FnResponse>(this.functions, 'deleteProject');
        const res = await deleteProject({projectID});
        return res.data;
    }

    public async GetProjectFromRef(projectRef: DocumentReference<Project>): Promise<Project> {
        const project = await firstValueFrom(docData(projectRef, {idField: 'ID'}));
        return project;
    }
}
