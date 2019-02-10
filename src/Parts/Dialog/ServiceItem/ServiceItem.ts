import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OwnedCarModel, ComponentServiceService, ServiceTypeModel, WorkItemService, CarService, AddRepeatingSettings } from "src/Services/Api/Api";
import { Observable, forkJoin } from 'rxjs';

@Component({
	templateUrl:'./ServiceItem.html'
})
export class ServiceItemDialog {
	private Car:OwnedCarModel;
	public Loading:boolean = false;
	
	public ageGroup:string;
	public repeatGroup:string;
	public ageStartGroup:string;
	public distanceGroup:string;
	public ageManual:string;
	public distanceManual:string;
	public startDate:Date;
	
	private error:any;
	
	private types:ServiceTypeModel[];
	private typeId:string;
	
	public ServiceTypeId:string;
	
	constructor(
		private diaRef:MatDialogRef<void>,
		@Inject(MAT_DIALOG_DATA) public data:OwnedCarModel,
		private service:WorkItemService,
		private componentService:ComponentServiceService,
		private carService:CarService
	) {
		this.Car = data;
		var repeat = componentService.getTypes();
		var parts = carService.getParts(data.Vin);
		
		forkJoin([repeat, parts]).subscribe(x=> {
			var currentParts = x[1];
			var totalParts = x[0];
			
			var carParts = currentParts.map(z=>z.ServiceType);
			this.types = totalParts.filter(z=> !carParts.includes(z.Name));
		});
	}
	
	save() {
		this.Loading = true;
		
		var model:AddRepeatingSettings = {
			TypeId: this.repeatGroup,
		};
		
		if(this.repeatGroup == "age") {
			model.Amount = this.ageGroup||this.ageManual;
			model.Offset = this.startDate;
		}
		else if(this.repeatGroup == "mileage") {
			model.Amount = this.distanceGroup||this.distanceManual;
		}
		
		
		
		this.service.createWorkItem({
			ServiceTypeId: this.ServiceTypeId,
			Vin: this.Car.Vin
		}).subscribe(x => {
			model.Id = x;
			this.service.setRepeat(model,x).subscribe(() => {
				this.diaRef.close();
			},error => {
				this.diaRef.close();
			});
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