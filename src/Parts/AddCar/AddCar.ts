import { Component } from "@angular/core";
import { VinClient, CarModel } from "src/Services/Api/Api";

@Component({
	selector:'add-car',
	templateUrl:'./AddCar.html'
})
export class AddCar {
	public vin:string;
	public Car:CarModel;
	constructor(private vinService:VinClient) {
		
	}
	
	save() {
		this.vinService.getVin(this.vin).subscribe(x=> {
			this.Car = x;
		});
	}
}