import {Component, Inject, OnInit} from '@angular/core';
import { Common } from "../../constants";
import { FirebaseStorageService } from "../../services/firebase-storage.service";
import { StorageReference } from "@angular/fire/storage";
import {AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Sponsor, Student} from "../../types";

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

    constructor(
        private firebaseStorageService: FirebaseStorageService,
        @Inject(MAT_DIALOG_DATA) public data: Sponsor | Student
    ) {
    }

    COMMON_MESSAGES = Common;
    files: any[] = [];
    existingFiles: any[] = [];

    saveBtnDisabled = false;

    ngOnInit(): void {
        this.reloadExistingFiles();
    }

    reloadExistingFiles(): void {
        let id = '';
        if (this.data._ID) {
            id = String(this.data._ID);
        }
        this.firebaseStorageService.getFileRefList(id).then((res) => {
            if (res.status) {
                this.existingFiles = res.data;
            }
        });
    }

    /**
     * on file drop handler
     */
    onFileDropped($event: any) {
        debugger
        this.prepareFilesList($event);
    }

    /**
     * handle file from browsing
     */
    fileBrowseHandler(files: any) {
        debugger
        this.prepareFilesList(files.files);
    }


    prepareFilesList(files: Array<any> | any) {
        for (const item of files) {
            item.progress = 0;
            this.files.push(item);
        }
        this.uploadFilesSimulator(0);
    }


    /**
     * format bytes
     * @param bytes (File size in bytes)
     * @param decimals (Decimals point)
     */
    formatBytes(bytes: any, decimals: any) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    /**
     * Delete file from files list
     * @param index (File index)
     */
    deleteFile(index: number) {
        this.files.splice(index, 1);
    }


    onClickDownload(fileRef: any): void {
        this.firebaseStorageService.getFileDownloadURL(fileRef as StorageReference).then((res) => {
            if (res.status) {
                const anchor = document.createElement("a");
                anchor.download = res.data.fileName;
                anchor.href = res.data.downloadUrl;
                anchor.target = "_blank";
                anchor.click();
            }
        });
    }

    uploadFilesSimulator(index: number) {
        debugger;
        setTimeout(() => {
            if (index === this.files.length) {
                return;
            } else {
                const progressInterval = setInterval(() => {
                    if (this.files[index].progress === 100) {
                        clearInterval(progressInterval);
                        this.uploadFilesSimulator(index + 1);
                    } else {
                        this.files[index].progress += 5;
                    }
                }, 200);
            }
        }, 1000);
    }

    onClickSaveUploads(): void {
        this.saveBtnDisabled = true;
        if (this.files.length > 0) {
            for (const item of this.files) {
                let id = '';
                if (this.data._ID) {
                    id = String(this.data._ID);
                }
                const file = new File([item], item.name, {type: item.type});
                this.firebaseStorageService.uploadFile(file, id).then((res) => {
                    console.log(res);
                    this.files = [];
                    this.saveBtnDisabled = false;
                    this.reloadExistingFiles();
                }).catch((err) => {
                    console.log(err);
                    this.saveBtnDisabled = false;
                    this.reloadExistingFiles();
                });
            }
        } else {
            console.log('No files to upload.');
            this.saveBtnDisabled = false;
            this.reloadExistingFiles();
        }
    }

    onClickDelete(fileRef: StorageReference) {
        this.firebaseStorageService.deleteFile(fileRef).then((res) => {
            if (res.status) {
                console.log(res.message);

                let id = '';
                if (this.data._ID) {
                    id = String(this.data._ID);
                }
                this.firebaseStorageService.getFileRefList(id).then((res) => {
                    if (res.status) {
                        this.existingFiles = res.data;
                    }
                });
            }
        });

    }
}
