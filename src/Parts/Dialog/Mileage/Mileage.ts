import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OwnedCarModel, MileageService, MileageModel } from "src/Services/Api/Api";

@Component({
	selector:'mileage-update',
	templateUrl:'./Mileage.html'
})
export class MileageDialog {
	constructor(
		private diaRef:MatDialogRef<void>,
		@Inject(MAT_DIALOG_DATA) public data:OwnedCarModel,
		private mileageService:MileageService
	) {
		this.Car = data;
		
	}
	public advanced:boolean = false;
	public Loading:boolean = false;
	
	private RecordingDate:Date;
	private Car:OwnedCarModel;
	private ErrorMessage:string = null;
	
	public save() {
		this.Loading = true;
		var data:MileageModel = {
			Mileage:this.Car.Mileage,
			Vin:this.Car.Vin
		};
		if(this.RecordingDate)
			data.RecordingDate = this.RecordingDate;
		this.mileageService.updateMileage(data).subscribe(x=> {
			this.diaRef.close();
		},x => {
			this.Loading = false;
			this.ErrorMessage = "Milage is wrong";
		});
	}
}