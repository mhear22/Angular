import { Injectable, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ServiceBase } from './ServiceBase';
import { UploadFileDialog } from '../Parts/Dialog/Upload/Upload';
import { ImageUploadResponse } from '../Models/ImageUploadResponse';
import { Observable } from 'rxjs';
import { MileageDialog } from 'src/Parts/Dialog/Mileage/Mileage';
import { OwnedCarModel, ReceiptModel } from './Api/Api';
import { DeleteCarDialog } from 'src/Parts/Dialog/DeleteCar/DeleteCar';
import { ServiceItemDialog } from 'src/Parts/Dialog/ServiceItem/ServiceItem';
import { UnsubscribeDialog } from 'src/Parts/Dialog/Unsubscribe/Unsubscribe';
import { RequestMileageDialog } from 'src/Parts/Dialog/RequestMileage/requestMileage';
import { PaymentReminderDialog } from 'src/Parts/Dialog/PaymentReminder/PaymentReminder';
import { SetupRepeatDialog } from 'src/Parts/Dialog/SetupRepeat/SetupRepeatDialog';
import { RecieveFeedbackDialog } from 'src/Parts/Dialog/RecieveFeedback/RecieveFeedback';


@Injectable()
export class DialogService extends ServiceBase {
	constructor(protected http: Http, private mdDialog:MatDialog) {
		super(http);
	}
	
	private SetupDialog(data,ref:ViewContainerRef, userData:any = null) {
		var conf = new MatDialogConfig();
		conf.viewContainerRef = ref;
		if(userData)
			conf.data = userData
		var resp = this.mdDialog.open(data,conf);
		return resp.afterClosed();
	}
	
	public SetupRepeater(viewContainerRef:ViewContainerRef, ServiceTypeId:ReceiptModel):Observable<void> {
		return this.SetupDialog(SetupRepeatDialog, viewContainerRef, ServiceTypeId);
	}
	
	public RemindToSignUp(viewContainerRef:ViewContainerRef):Observable<void> {
		return this.SetupDialog(PaymentReminderDialog, viewContainerRef);
	}
	
	public Unsubscribe(viewContainerRef: ViewContainerRef,UserId:string):Observable<void> {
		return this.SetupDialog(UnsubscribeDialog, viewContainerRef, UserId)
	}
	
	public SubmitFile(viewContainerRef: ViewContainerRef):Observable<ImageUploadResponse> {
		return this.SetupDialog(UploadFileDialog,viewContainerRef);
	}
	
	public UpdateMileage(viewContainerRef:ViewContainerRef,car:OwnedCarModel):Observable<void> {
		return this.SetupDialog(MileageDialog, viewContainerRef, car);
	}
	
	public DeleteCar(viewContainerRef:ViewContainerRef, car:OwnedCarModel):Observable<void> {
		return this.SetupDialog(DeleteCarDialog, viewContainerRef, car);
	}
	
	public AddServiceItem(viewContainerRef:ViewContainerRef, car:OwnedCarModel):Observable<void> {
		return this.SetupDialog(ServiceItemDialog, viewContainerRef, car);
	}
	
	public VerifyMileage(viewContainerRef:ViewContainerRef, vin:string):Observable<string> {
		return this.SetupDialog(RequestMileageDialog, viewContainerRef, vin);
	}
	
	public RecieveFeedback(viewContainerRef: ViewContainerRef, Context:any):Observable<void> {
		return this.SetupDialog(RecieveFeedbackDialog,viewContainerRef, Context)
	}
}