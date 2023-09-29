import {Injectable} from '@angular/core';
import {
    listAll,
    ref,
    Storage,
    uploadBytes,
    StorageReference,
    getDownloadURL,
    deleteObject
} from "@angular/fire/storage";
import {v4 as uuidv4} from 'uuid';
import {FnResponse} from "../types";

@Injectable({
    providedIn: 'root'
})
export class FirebaseStorageService {

    constructor(
        private storage: Storage,
    ) {
    }

    async uploadFile(file: File, filePath: string): Promise<FnResponse> {
        debugger
        const id = uuidv4();
        const storageRef = ref(this.storage, `Attachments/${filePath}/${id}.${file.name.split('.').pop()}`);
        try {
            const res = await uploadBytes(storageRef, file, {
                contentType: file.type,
            });
            return {
                status: true,
                message: 'File uploaded successfully.',
                data: res,
            }
        } catch (e) {
            console.error(e);
            return {
                status: false,
                message: (e as Error).message,
                data: e,
            }
        }
    }

    async getFileRefList(filePath: string): Promise<FnResponse> {
        const storageRef: StorageReference = ref(this.storage, `Attachments/${filePath}`);
        try {
            const refList = await listAll(storageRef);
            const refObjList = [];
            for (const item of refList.items) {
                refObjList.push({
                    name: item.name,
                    ref: item,
                });
            }
            return {
                status: true,
                message: 'File list retrieved successfully.',
                data: refObjList,
            }
        } catch (e) {
            console.error(e);
            return {
                status: false,
                message: (e as Error).message,
                data: e,
            }
        }
    }

    async getFileDownloadURL(fileRef: StorageReference): Promise<FnResponse> {
        try {
            const fileName = fileRef.name;
            const downloadUrl = await getDownloadURL(fileRef);
            return {
                status: true,
                message: 'File download URL retrieved successfully.',
                data: {
                    fileName: fileName,
                    downloadUrl: downloadUrl,
                },
            }
        } catch (e) {
            console.error(e);
            return {
                status: false,
                message: (e as Error).message,
                data: e,
            }
        }
    }

    async deleteFile(fileRef: StorageReference): Promise<FnResponse> {
        try {
            await deleteObject(fileRef);
            return {
                status: true,
                message: 'File deleted successfully.',
                data: null,
            }
        } catch (e) {
            console.error(e);
            return {
                status: false,
                message: (e as Error).message,
                data: e,
            }
        }
    }
}
