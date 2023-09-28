import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from "@angular/fire/firestore";
import { CollectionReference, DocumentReference } from "@firebase/firestore";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GeneralFirebaseService {

    constructor(
        private firestore: Firestore,
    ) {
    }

    GetReferenceCollection(collectionRef: CollectionReference) {
        return collectionData(collectionRef, {idField: 'ID'});
    }

    GetReferenceDocument<T>(documentRef: DocumentReference<T>) {
        return docData(documentRef, {idField: 'ID'}) as Observable<T>;
    }

}
