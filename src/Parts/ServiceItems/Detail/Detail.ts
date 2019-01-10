import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComponentServiceService } from "src/Services/Api/Api";

@Component({
	selector:"service-detail",
	templateUrl:'./Detail.html'
})
export class ServiceDetail implements OnInit {
	constructor(
		private route:ActivatedRoute,
		private componentService:ComponentServiceService
	) { }
	
	public ngOnInit() {
		this.update();
	}
	
	private Id:string;
	private PartId:string;
	private Part:any;
	private Loading:boolean = true;
	
	private update() {
		this.Id = this.route.snapshot.paramMap.get("Id");
		this.PartId = this.route.snapshot.paramMap.get("PartId");
		
		this.componentService.getPart(this.Id, this.PartId).subscribe(x=> {
			this.Part = x;
			this.Loading = false;
		});
	}
}