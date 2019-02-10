import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentServiceService, WorkItemService, ReceiptModel } from "src/Services/Api/Api";
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
		private workItemService:WorkItemService
	) { }
	
	public ngOnInit() {
		this.update();
	}
	
	private Id:string;
	private PartId:string;
	private Part:ReceiptModel;
	public Loading:boolean = true;
	
	private update() {
		this.Id = this.route.snapshot.paramMap.get("Id");
		this.PartId = this.route.snapshot.paramMap.get("PartId");
		
		this.workItemService.getItem(this.PartId).subscribe(x=> {
			this.Part = x;
			this.Loading = false;
		});
	}
	
	private delete() {
		this.workItemService.deleteWorkItem(this.PartId).subscribe(x=> {
			this.router.navigate(['/car/' + this.Id]);
		});
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