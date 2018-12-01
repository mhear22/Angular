import { Component, OnInit } from "@angular/core";
import { CarService, OwnedCarModel } from "src/Services/Api/Api";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector:'edit-car',
	templateUrl:'./EditCar.html'
})
export class EditCar implements OnInit {
	constructor(
		private carService:CarService,
		private route:ActivatedRoute,
		private router:Router
	) { }
	public Id:string;
	public Car:OwnedCarModel;
	public Loading:boolean = true;
	
	public ngOnInit() {
		this.Id = this.route.snapshot.paramMap.get("Id");
		this.carService.getCar(this.Id).subscribe(x=> {
			this.Car = x;
			this.Loading = false;
		})
	}
	
	public save() {
		this.carService.updateCar(this.Id, this.Car).subscribe(x=> {
			this.router.navigate([`/car/${this.Id}`])
		});
	}
}