import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OwnedCarModel, ComponentServiceService, ServiceTypeDto, ServiceItem } from "src/Services/Api/Api";

@Component({
	templateUrl:'./ServiceItem.html'
})
export class ServiceItemDialog {
	private Car:OwnedCarModel;
	private Loading:boolean = false;
	private repeats:ServiceTypeDto[];
	private repeating:string;
	private repeatingFrequency:string;
	
	private types:ServiceTypeDto[];
	private typeId:string;
	
	private item:ServiceItem = {};
	
	constructor(
		private diaRef:MatDialogRef<void>,
		@Inject(MAT_DIALOG_DATA) public data:OwnedCarModel,
		private service:ComponentServiceService
	) {
		this.Car = data;
		
		service.getRepeatTypes().subscribe((x) => {
			this.repeats = x;
		});
		
		service.getTypes().subscribe((x) => {
			this.types = x;
		});
	}
	
	save() {
		this.Loading = true;
		this.service.addPart(this.Car.Vin,this.item).subscribe(() => {
			this.diaRef.close();
		});
	}
	
	IdName(Id) {
		if(Id == "age")
			return "years";
		else
			return "kilometers";
	}
}