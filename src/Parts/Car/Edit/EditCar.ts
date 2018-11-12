import { Component, OnInit } from "@angular/core";
import { CarService, OwnedCarModel } from "src/Services/Api/Api";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector:'edit-car',
	templateUrl:'./EditCar.html'
})
export class EditCar implements OnInit {
	constructor(
		private carService:CarService,
		private route:ActivatedRoute
	) { }
	public Car:OwnedCarModel;
	public Loading:boolean = true;
	
	public ngOnInit() {
		var Id = this.route.snapshot.paramMap.get("Id");
		this.carService.getCar(Id).subscribe(x=> {
			this.Car = x;
			this.Loading = false;
		})
	}
}