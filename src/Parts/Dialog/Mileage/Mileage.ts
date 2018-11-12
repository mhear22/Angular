import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OwnedCarModel, MileageService } from "src/Services/Api/Api";

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
	private Car:OwnedCarModel;
	private Loading:boolean = false;
	
	public save() {
		this.Loading = true;
		this.mileageService.updateMileage({
			Mileage:this.Car.Mileage,
			Vin:this.Car.Vin
		}).subscribe(x=> {
			
			this.diaRef.close();
		})
	}
}