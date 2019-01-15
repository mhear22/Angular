import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { PaymentService } from "src/Services/Api/Api";

@Component({
	selector:'unsubscribe-account',
	templateUrl:'./Unsubscribe.html'
})
export class UnsubscribeDialog {
	constructor(
		public diaRef: MatDialogRef<UnsubscribeDialog>,
		private paymentService:PaymentService,
		@Inject(MAT_DIALOG_DATA) public data:string
	) {
		
	}
	
	public save() {
		this.paymentService.deleteSubscription(this.data).subscribe(() => {
			this.diaRef.close();
		});
	}
	public cancel() {
		this.diaRef.close();
	}
}