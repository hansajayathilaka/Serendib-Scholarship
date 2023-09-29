import {Injectable} from '@angular/core';
import {
    listAll,
    ref,
    Storage,
    uploadBytes,
    StorageReference,
    getDownloadURL,
    deleteObject, getMetadata
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
        const ext = file.name.split('.').pop();
        let uniqueFileName: string;
        debugger;
        if (ext) {
            uniqueFileName = `${id}.${ext}`;
        } else {
            uniqueFileName = `${id}`;
        }
        const storageRef = ref(this.storage, `Attachments/${filePath}/${uniqueFileName}`);
        try {
            const res = await uploadBytes(storageRef, file, {
                contentType: file.type,
                customMetadata: {
                    'fileName': file.name
                }
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

                const metaData = await getMetadata(item);
                let exactFileName: string;
                if (metaData.customMetadata && metaData.customMetadata['fileName']) {
                    exactFileName = metaData.customMetadata['fileName'];
                } else {
                    exactFileName = item.name;
                }

                refObjList.push({
                    name: exactFileName,
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
            debugger;
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
