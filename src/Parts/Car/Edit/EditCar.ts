import { Component, OnInit } from "@angular/core";
import { CarService, OwnedCarModel, MileageService, MileageRecordingModel } from "src/Services/Api/Api";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector:'edit-car',
	templateUrl:'./EditCar.html',
	styleUrls:['./EditCar.scss']
})
export class EditCar implements OnInit {
	constructor(
		private carService:CarService,
		private route:ActivatedRoute,
		private router:Router,
		private mileageService:MileageService
	) { }
	public Id:string;
	public Car:OwnedCarModel;
	public Loading:boolean = true;
	private points:MileageRecordingModel[]
	
	public ngOnInit() {
		this.Id = this.route.snapshot.paramMap.get("Id");
		this.carService.getCar(this.Id).subscribe(x=> {
			this.Car = x;
			this.Loading = false;
			this.mileageService.getMileage(this.Car.Vin).subscribe(points=> {
				this.points = points;
			});
		});
	}
	
	public save() {
		this.carService.updateCar(this.Id, this.Car).subscribe(x=> {
			this.router.navigate([`/car/${this.Id}`])
		});
	}
}