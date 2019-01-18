import { Component, Inject } from "@angular/core";
import { MileageService } from "src/Services/Api/Api";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
	selector:'request-mileage',
	templateUrl:'./requestMileage.html'
})
export class RequestMileageDialog {
	private currentMileage = "0";
	constructor(
		private diaRef:MatDialogRef<string>,
		private mileageService:MileageService,
		@Inject(MAT_DIALOG_DATA) public data:string
	) {
		mileageService.getEstimatedMileage(data).subscribe(x => {
			this.currentMileage = x;
		});
	}
	
	public save() {
		this.diaRef.close(this.currentMileage);
	}
}