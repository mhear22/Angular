import { Component, OnInit, ViewContainerRef, Inject } from "@angular/core";
import { CarService, OwnedCarModel, MileageService, MileageRecordingModel, API_BASE_URL } from "src/Services/Api/Api";
import { ActivatedRoute, Router } from "@angular/router";
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
		private router:Router,
		private viewContainerRef: ViewContainerRef,
		private dialogService:DialogService,
		private mileageService:MileageService,
		@Inject(API_BASE_URL) public ApiUrl?: string
	) { }
	
	public Car: OwnedCarModel;
	public Mileage: MileageRecordingModel[];
	
	public chartSettings: any = {
		view:[
			700,
			400
		],
		data:[
			{
				name:"Car",
				series:[
					//{
					//	name:"2010",
					//	value:1000
					//},
					//{
					//	name:"2015",
					//	value:2000
					//}
				]
			}
		]
	};
	
	public Loading:boolean = true;
	public ngOnInit() {
		this.update();
	}
	
	public get Nickname() {
		if(this.Car == null)
			return "Car";
		return `${this.Car.Base.Manufacturer.Name}`;
	}
	private update() {
		var Id = this.route.snapshot.paramMap.get("Id");
		this.carService.getCar(Id).subscribe(x=> {
			this.Car = x;
			this.Loading = false;
			this.mileageService.getMileage(x.Vin).subscribe(x=>{
				this.Mileage = x;
				var data = {
					name:"Car",
					series:x.map(z=> {
						return {
							name:z.Year+"",
							value:Number(z.Recording)
						}
					})
				}
				Object.assign(this.chartSettings, {data:[data]});
			})
		},() => {
			this.router.navigate([`/home`]);
		});
	}
	
	public updateMileage() {
		this.dialogService.UpdateMileage(this.viewContainerRef, this.Car).subscribe(() => {
			this.update();
		});
	}
	
	public delete() {
		this.dialogService.DeleteCar(this.viewContainerRef, this.Car).subscribe(() => {
			this.update();
		});
	}
}