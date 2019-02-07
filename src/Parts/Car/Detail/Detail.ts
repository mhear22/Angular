import { Component, OnInit, ViewContainerRef, Inject, ViewChild, ElementRef, HostListener } from "@angular/core";
import { CarService, OwnedCarModel, MileageService, MileageRecordingModel, API_BASE_URL, EmailService, ReceiptModel } from "src/Services/Api/Api";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { DialogService } from "src/Services/DialogService";
import { GraphingService } from "src/Services/GraphingService";
import { chartModel } from "src/Models/ChartModel";
import { ServiceBase } from "src/Services/ServiceBase";
import { LoginService } from "src/Services/LoginService";

@Component({
	selector:'car',
	templateUrl:'./Detail.html'
})
export class CarDetail implements OnInit {
	constructor(
		private carService:CarService,
		private route:ActivatedRoute,
		private router:Router,
		private viewContainerRef: ViewContainerRef,
		private dialogService:DialogService,
		private mileageService:MileageService,
		private graphingService:GraphingService,
		private emailService:EmailService,
		private loginService:LoginService,
		@Inject(API_BASE_URL) public ApiUrl?: string
	) { }
	
	@ViewChild("chartcontainer")
	chartContainer:ElementRef;
	
	@HostListener('window:resize')
	resize() {
		this.chartSettings.view[0] = this.chartContainer.nativeElement.offsetWidth;
	}
	
	private get ApiKey() {
		return ServiceBase.ApiKey;
	}
	
	private comps: ReceiptModel[];
	public Car: OwnedCarModel;
	public Mileage: MileageRecordingModel[];
	private SendingTest:boolean = false;
	private estimatedMileage:string;
	
	public chartSettings: chartModel = new chartModel();
	
	public Loading:boolean = true;
	public ngOnInit() {
		this.update();
	}
	
	public addMaintenanceItem() {
		this.dialogService.AddServiceItem(this.viewContainerRef, this.Car).subscribe(() => {
			this.update();
		});
	}
	
	public sendTestEmail() {
		this.SendingTest = true;
		this.emailService.sendTestEmail(this.Car.Vin).subscribe(() => {
			this.SendingTest = false;
		})
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
			
			this.mileageService.getEstimatedMileage(x.Vin).subscribe(est => {
				this.estimatedMileage = est;
			});
			this.mileageService.getMileage(x.Vin).subscribe(mil=>{
				this.Mileage = mil;
				var data = this.graphingService.BestFitPointsToGraph(mil);
				this.resize();
				Object.assign(this.chartSettings, {data:[data]});
			})
			
			
			this.carService.getParts(x.Vin).subscribe(parts => {
				this.comps = parts;
			});
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