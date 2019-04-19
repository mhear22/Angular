import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { ServiceBase } from '../../../Services/ServiceBase';
import { ImageUploadResponse } from '../../../Models/ImageUploadResponse';
import { API_BASE_URL } from 'src/Services/Api/Api';

@Component({
	selector:'upload-file-dialog',
	templateUrl: './Upload.html'
})
export class UploadFileDialog {
	uploader:FileUploader;
	isLoading: boolean = false;
	constructor(
		public diaRef: MatDialogRef<UploadFileDialog>,
		@Inject(API_BASE_URL) baseUrl?: string
	) {
		this.uploader = new FileUploader({url: baseUrl + "i/?api_key=" + ServiceBase.ApiKey, autoUpload: true});
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