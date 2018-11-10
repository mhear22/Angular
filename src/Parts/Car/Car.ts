import { Component, OnInit } from "@angular/core";
import { CarService, OwnedCarModel } from "src/Services/Api/Api";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector:'car',
	templateUrl:'./Car.html'
})
export class Car implements OnInit{
	constructor(
		private carService:CarService,
		private route:ActivatedRoute
	) { }
	
	public Car: OwnedCarModel;
	public ngOnInit() {
		var Id = this.route.snapshot.paramMap.get("Id");
		this.carService.getCar(Id).subscribe(x=> {
			this.Car = x;
		});
	}
}