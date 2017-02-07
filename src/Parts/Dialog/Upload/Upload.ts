import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { ServiceBase } from '../../../Services/ServiceBase';

@Component({
	selector:'upload-file-dialog',
	templateUrl: './Parts/Dialog/Upload/Upload.html'
})
export class UploadFileDialog {
	public uploader:FileUploader = new FileUploader({url: ServiceBase.ApiUrl + "images/?api_key=" + ServiceBase.ApiKey, autoUpload: true});
	constructor() {
	}
}