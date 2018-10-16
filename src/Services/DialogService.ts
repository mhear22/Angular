import { Injector, Injectable, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ServiceBase } from './ServiceBase';
import { UploadFileDialog } from '../Parts/Dialog/Upload/Upload';
import { ImageUploadResponse } from '../Models/ImageUploadResponse';
import { Observable } from 'rxjs';


@Injectable()
export class DialogService extends ServiceBase {
	constructor(protected http: Http, private mdDialog:MatDialog) {
		super(http);
	}
	
	public SubmitFile(viewContainerRef: ViewContainerRef):Observable<ImageUploadResponse> {
		var conf = new MatDialogConfig();
		conf.viewContainerRef = viewContainerRef;
		
		var ref = this.mdDialog.open(UploadFileDialog, conf);
		return ref.afterClosed();
	}
}