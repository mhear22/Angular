import { Injectable, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ServiceBase } from './ServiceBase';
import { UploadFileDialog } from '../Parts/Dialog/Upload/Upload';
import { ImageUploadResponse } from '../Models/ImageUploadResponse';
import { Observable } from 'rxjs';
import { MileageDialog } from 'src/Parts/Dialog/Mileage/Mileage';
import { OwnedCarModel } from './Api/Api';
import { DeleteCarDialog } from 'src/Parts/Dialog/DeleteCar/DeleteCar';
import { ServiceItemDialog } from 'src/Parts/Dialog/ServiceItem/ServiceItem';
import { UnsubscribeDialog } from 'src/Parts/Dialog/Unsubscribe/Unsubscribe';
import { RequestMileageDialog } from 'src/Parts/Dialog/RequestMileage/requestMileage';
import { PaymentReminderDialog } from 'src/Parts/Dialog/PaymentReminder/PaymentReminder';


@Injectable()
export class DialogService extends ServiceBase {
	constructor(protected http: Http, private mdDialog:MatDialog) {
		super(http);
	}
	
	public RemindToSignUp(viewContainerRef:ViewContainerRef):Observable<void> {
		var conf = new MatDialogConfig();
		conf.viewContainerRef = viewContainerRef;
		var ref = this.mdDialog.open(PaymentReminderDialog, {
			viewContainerRef:viewContainerRef
		});
		return ref.afterClosed();
	}
	
	public Unsubscribe(viewContainerRef: ViewContainerRef,UserId:string):Observable<void> {
		var conf = new MatDialogConfig();
		conf.viewContainerRef = viewContainerRef;
		var ref = this.mdDialog.open(UnsubscribeDialog, {
			data:UserId,
			viewContainerRef:viewContainerRef
		});
		return ref.afterClosed();
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
	
	public DeleteCar(viewContainerRef:ViewContainerRef, car:OwnedCarModel):Observable<void> {
		var ref = this.mdDialog.open(DeleteCarDialog, {
			data:car,
			viewContainerRef:viewContainerRef
		});
		return ref.afterClosed();
	}
	
	public AddServiceItem(viewContainerRef:ViewContainerRef, car:OwnedCarModel):Observable<void> {
		var ref = this.mdDialog.open(ServiceItemDialog, {
			data:car,
			viewContainerRef:viewContainerRef
		});
		return ref.afterClosed();
	}
	
	public VerifyMileage(viewContainerRef:ViewContainerRef, vin:string):Observable<string> {
		var ref = this.mdDialog.open(RequestMileageDialog, {
			data:vin,
			viewContainerRef:viewContainerRef
		});
		return ref.afterClosed();
	}
}