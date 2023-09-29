import { Component, OnInit } from '@angular/core';
import { Common } from "../../constants";
import { FirebaseStorageService } from "../../services/firebase-storage.service";
import { StorageReference } from "@angular/fire/storage";

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

    constructor(private FirebaseStorageService: FirebaseStorageService) {
    }


    COMMON_MESSAGES = Common;
    files: any[] = [];
    existingFiles: any[] = [];

    ngOnInit(): void {
        this.FirebaseStorageService.getFileRefList('test').then((res) => {
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
        this.prepareFilesList($event.files);
    }

    /**
     * handle file from browsing
     */
    fileBrowseHandler(files: any) {
        debugger
        this.prepareFilesList(files.files);
    }


    prepareFilesList(files: Array<any>) {
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
        this.FirebaseStorageService.getFileDownloadURL(fileRef as StorageReference).then((res) => {
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
        debugger
        if (this.files.length > 0) {
            for (const item of this.files) {
                debugger
                const file = new File([item], item.name, {type: item.type});
                this.FirebaseStorageService.uploadFile(file, 'test').then((res) => {
                    console.log(res);
                });
            }
        } else {
            console.log('No files to upload.');
        }
    }

    onClickDelete(fileRef: StorageReference) {
        this.FirebaseStorageService.deleteFile(fileRef).then((res) => {
            if (res.status) {
                console.log(res.message);
                this.FirebaseStorageService.getFileRefList('test').then((res) => {
                    if (res.status) {
                        this.existingFiles = res.data;
                    }
                });
            }
        });

    }
}
