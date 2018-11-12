import { Injectable, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ServiceBase } from './ServiceBase';
import { UploadFileDialog } from '../Parts/Dialog/Upload/Upload';
import { ImageUploadResponse } from '../Models/ImageUploadResponse';
import { Observable } from 'rxjs';
import { MileageDialog } from 'src/Parts/Dialog/Mileage/Mileage';
import { OwnedCarModel } from './Api/Api';


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
	
	public UpdateMileage(viewContainerRef:ViewContainerRef,car:OwnedCarModel):Observable<void> {
		var ref = this.mdDialog.open(MileageDialog,{
			data:car,
			viewContainerRef:viewContainerRef
		});
		return ref.afterClosed();
	}
}