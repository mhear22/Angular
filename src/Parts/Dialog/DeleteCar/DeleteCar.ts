import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OwnedCarModel, CarService } from "src/Services/Api/Api";

@Component({
	templateUrl:'./DeleteCar.html'
})
export class DeleteCarDialog {
	constructor(
		private diaRef:MatDialogRef<void>,
		@Inject(MAT_DIALOG_DATA) public data:OwnedCarModel,
		private carService:CarService
	) {
		this.Car = data;
	}
	private Car:OwnedCarModel;
	private Loading:boolean = false;
	
	public Delete() {
		this.Loading = true;
		this.carService.deleteOwnedCar(this.Car.Vin).subscribe(()=> {
			this.diaRef.close();
		});
	}
	public Cancel() {
		this.diaRef.close();
	}
}