import { Injector, Injectable, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { ServiceBase } from './ServiceBase';
import { UploadFileDialog } from '../Parts/Dialog/Upload/Upload';
import { ImageUploadResponse } from '../Models/ImageUploadResponse';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DialogService extends ServiceBase {
	constructor(protected http: Http, private mdDialog:MdDialog) {
		super(http);
	}
	
	public SubmitFile(viewContainerRef: ViewContainerRef):Observable<ImageUploadResponse> {
		var conf = new MdDialogConfig();
		conf.viewContainerRef = viewContainerRef;
		
		var ref = this.mdDialog.open(UploadFileDialog, conf);
		return ref.afterClosed();
	}
}