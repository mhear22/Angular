import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { CarService, OwnedCarModel } from "src/Services/Api/Api";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { DialogService } from "src/Services/DialogService";

@Component({
	selector:'car',
	templateUrl:'./Detail.html'
})
export class CarDetail implements OnInit{
	constructor(
		private carService:CarService,
		private route:ActivatedRoute,
		private viewContainerRef: ViewContainerRef,
		private dialogService:DialogService
	) { }
	
	public Car: OwnedCarModel;
	public Loading:boolean = true;
	public ngOnInit() {
		this.update();
	}
	
	private update() {
		var Id = this.route.snapshot.paramMap.get("Id");
		this.carService.getCar(Id).subscribe(x=> {
			this.Car = x;
			this.Loading = false;
		});
	}
	
	public updateMileage() {
		this.dialogService.UpdateMileage(this.viewContainerRef, this.Car).subscribe(() => {
			this.update();
		});
	}
}