import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { VinService, CarModel, CarService, CarCreateModel } from "src/Services/Api/Api";
import { Router } from "@angular/router";
import { LoginService } from 'src/Services/LoginService';
import { DialogService } from 'src/Services/DialogService';

@Component({
	selector:'add-car',
	templateUrl:'./AddCar.html'
})
export class AddCar implements OnInit {
	public vin:string;
	public Car:CarModel;
	public nickname:string;
	public createdYear:number;
	public currentMileage:number;
	public nextService:string;
	
	public Loading:boolean = true;
	
	constructor(
		private vinService:VinService,
		private carService:CarService,
		private router:Router,
		private UserService: LoginService,
		private dialogService:DialogService,
		private viewContainerRef: ViewContainerRef
	) { }
	
	ngOnInit() {
		this.UserService.GetCurrentUser().subscribe(currentUsers=> {
			this.carService.getForUser(currentUsers.Id).subscribe(cars=> {
				var TooManyCars = cars.Count >= 2;
				var hasPlan = !!currentUsers.PlanNickname;
				if(TooManyCars && !hasPlan) {
					this.dialogService.RemindToSignUp(this.viewContainerRef).subscribe(x=> {
						
					});
				}
				this.Loading = false;
			});
		});
	}
	
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
				CurrentMileage:this.currentMileage,
				NextService:new Date(this.nextService)
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