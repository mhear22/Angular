import { Component } from "@angular/core";
import { VinService, CarModel, CarService, CarCreateModel } from "src/Services/Api/Api";

@Component({
	selector:'add-car',
	templateUrl:'./AddCar.html'
})
export class AddCar {
	public vin:string;
	public Car:CarModel;
	public nickname:string;
	constructor(private vinService:VinService, private carService:CarService) { }
	
	checkVin(event:KeyboardEvent) {
		if(this.vin.length == 17) {
			this.vinService.getVin(this.vin).subscribe(x=> {
				this.Car = x;
			});
		}
	}
	
	save() {
		if(this.vin && this.vin.length == 17 && this.nickname) {
			this.carService.createCar({
				Nickname: this.nickname,
				Vin: this.vin,
			}).subscribe(x=> {
				
			})
		}
	}
}