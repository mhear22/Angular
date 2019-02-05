import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OwnedCarModel, ComponentServiceService, ServiceTypeDto, WorkItemService } from "src/Services/Api/Api";

@Component({
	templateUrl:'./ServiceItem.html'
})
export class ServiceItemDialog {
	private Car:OwnedCarModel;
	public Loading:boolean = false;
	private repeats:ServiceTypeDto[];
	private repeating:string;
	private repeatingFrequency:string;
	
	private error:any;
	
	private types:ServiceTypeDto[];
	private typeId:string;
	
	public ServiceTypeId:string;
	
	constructor(
		private diaRef:MatDialogRef<void>,
		@Inject(MAT_DIALOG_DATA) public data:OwnedCarModel,
		private service:WorkItemService,
		private componentService:ComponentServiceService
	) {
		this.Car = data;
		componentService.getRepeatTypes().subscribe((x) => {
			this.repeats = x;
		});
		
		componentService.getTypes().subscribe((x) => {
			this.types = x;
		});
	}
	
	save() {
		this.Loading = true;
		
		this.service.createWorkItem({
			ServiceTypeId: this.ServiceTypeId,
			Vin: this.Car.Vin
		}).subscribe(() => {
			this.diaRef.close();
		}, error => {
			this.Loading = false;
			this.error = error;
		});
	}
	
	IdName(Id) {
		if(Id == "age")
			return "years";
		else
			return "kilometers";
	}
}