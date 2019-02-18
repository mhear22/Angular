import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentServiceService, WorkItemService, ReceiptModel, CarService, OwnedCarModel, MileageService, ServiceReceiptModel } from "src/Services/Api/Api";
import { DialogService } from "src/Services/DialogService";

@Component({
	selector:"service-detail",
	templateUrl:'./Detail.html'
})
export class ServiceDetail implements OnInit {
	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private dialogService:DialogService,
		private viewContainerRef: ViewContainerRef,
		private workItemService:WorkItemService,
		private mileageService:MileageService
	) {
		this.Id = this.route.snapshot.paramMap.get("Id");
		this.PartId = this.route.snapshot.paramMap.get("PartId");
	}
	
	public ngOnInit() {
		this.update();
	}
	
	private Id:string;
	private PartId:string;
	private Part:ReceiptModel;
	public Loading:boolean = true;
	public Car:OwnedCarModel = {};
	public Receipts:ServiceReceiptModel[];
	
	private update() {
		this.Loading = true;
		
		this.workItemService.getItem(this.PartId).subscribe(x=> {
			this.Part = x;
			this.Loading = false;
		});
		
		this.mileageService.getEstimatedMileage(this.Id).subscribe(x=> {
			this.Car.EstimatedCurrentMileage=x;
		});
		
		this.workItemService.getReceipts(this.PartId).subscribe(x=> {
			this.Receipts = x;
		});
	}
	
	private delete() {
		return;
		this.workItemService.deleteWorkItem(this.PartId).subscribe(x=> {
			this.router.navigate(['/car/' + this.Id]);
		});
	}
	
	private disableRepeat() {
		this.workItemService.deleteRepeat(this.PartId).subscribe(x=>{
			this.update();
		});
	}
	
	private setupRepeat() {
		this.dialogService;
	}
	
	private CompleteServiceItem() {
		this.Loading = true;
		this.dialogService.VerifyMileage(this.viewContainerRef,this.Id).subscribe(x=> {
			this.workItemService.addReceipt(this.PartId, x).subscribe(() => {
				this.Loading = false;
				this.update();
			});
		})
	}
}