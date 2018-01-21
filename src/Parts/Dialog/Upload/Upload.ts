import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { ServiceBase } from '../../../Services/ServiceBase';
import { ImageUploadResponse } from '../../../Models/ImageUploadResponse';
import { Observable } from 'rxjs/Observable';

@Component({
	selector:'upload-file-dialog',
	template: require('./Upload.html')
})
export class UploadFileDialog {
	private uploader:FileUploader;
	private isLoading: boolean = false;
	constructor(public diaRef: MdDialogRef<UploadFileDialog>) {
		this.uploader = new FileUploader({url: ServiceBase.ApiUrl + "i/?api_key=" + ServiceBase.ApiKey, autoUpload: true});
		this.uploader.onBeforeUploadItem = () =>{
			this.isLoading = true;
		} 
		
		this.uploader.onCompleteItem = (item, response:string, status:Number, header) => {
			if(status == 200){
				var obj = JSON.parse(response);
				this.diaRef.close(obj as ImageUploadResponse);
			}
		}
	}
}