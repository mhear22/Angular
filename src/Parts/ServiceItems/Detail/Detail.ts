import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComponentServiceService } from "src/Services/Api/Api";
import { DialogService } from "src/Services/DialogService";

@Component({
	selector:"service-detail",
	templateUrl:'./Detail.html'
})
export class ServiceDetail implements OnInit {
	constructor(
		private route:ActivatedRoute,
		private componentService:ComponentServiceService,
		private dialogService:DialogService,
		private viewContainerRef: ViewContainerRef
	) { }
	
	public ngOnInit() {
		this.update();
	}
	
	
	private Id:string;
	private PartId:string;
	private Part:any;
	public Loading:boolean = true;
	
	private update() {
		this.Id = this.route.snapshot.paramMap.get("Id");
		this.PartId = this.route.snapshot.paramMap.get("PartId");
		
		
		//this.componentService.getPart(this.Id, this.PartId).subscribe(x=> {
		//	this.Part = x;
		//	this.Loading = false;
		//});
	}
	
	private CompleteServiceItem() {
		this.Loading = true;
		this.dialogService.VerifyMileage(this.viewContainerRef,this.Id).subscribe(x=> {
			//this.componentService.completeWork(this.Id, this.PartId, {
			//	CurrentMiles:x
			//}).subscribe(() => {
			//	this.Loading = false;
			//	this.update();
			//});
		})
	}
}