import { Component } from "@angular/core";
import { VinService, CarModel, CarService, CarCreateModel } from "src/Services/Api/Api";
import { Router } from "@angular/router";

@Component({
	selector:'add-car',
	templateUrl:'./AddCar.html'
})
export class AddCar {
	public vin:string;
	public Car:CarModel;
	public nickname:string;
	public createdYear:number;
	public currentMileage:number;
	
	constructor(
		private vinService:VinService,
		private carService:CarService,
		private router:Router
	) { }
	
	get years() {
		var oldYear = 1980;
		var YearsSupported = new Date().getFullYear() - (oldYear -1);
		
		var result = Array
			.apply(null, {length:YearsSupported})
			.map(Function.call, Number)
			.map(x=> {
				return YearsSupported + oldYear - x;
			});
			
		return result;
	}
	
	checkVin(event:KeyboardEvent) {
		if(this.vin.length == 17) {
			this.vinService.getVin(this.vin).subscribe(x=> {
				this.Car = x;
			});
		}
	}
	
	save() {
		if(this.vin && this.vin.length == 17 && this.nickname) {
			var model:CarCreateModel = {
				Nickname: this.nickname,
				Vin: this.vin,
				CurrentMileage:this.currentMileage
			}
			if(this.createdYear) {
				var date = new Date();
				date.setFullYear(this.createdYear, 0, 1);
				model.ManufacturedDate = date;
			}
			
			this.carService.createCar(model).subscribe(x=> {
				this.router.navigate(['/home']);
			})
		}
	}
}