import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { ServiceBase } from '../../../Services/ServiceBase';
import { ImageUploadResponse } from '../../../Models/ImageUploadResponse';
import { Observable } from 'rxjs/Observable';

@Component({
	selector:'upload-file-dialog',
	templateUrl: './Parts/Dialog/Upload/Upload.html'
})
export class UploadFileDialog {
	public uploader:FileUploader;
	public onComplete: Observable<ImageUploadResponse> = new Observable<ImageUploadResponse>();
	constructor() {
		this.uploader = new FileUploader({url: ServiceBase.ApiUrl + "i/?api_key=" + ServiceBase.ApiKey, autoUpload: true});
		this.uploader.onCompleteItem = (item, response:string, status:Number, header) => {
			if(status == 200){
				var obj = JSON.parse(response);
				var x = obj as ImageUploadResponse;
			}
		}
	}
}