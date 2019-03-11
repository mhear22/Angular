import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WorkItemService, ReceiptModel, AddRepeatingSettings } from 'src/Services/Api/Api';

@Component({
	templateUrl:'./SetupRepeat.html'
})
export class SetupRepeatDialog {
	private WorkItem:ReceiptModel;
	private Loading:boolean = false;
	private Error:any;
	
	public ageGroup:string;
	public repeatGroup:string;
	public ageStartGroup:string;
	public distanceGroup:string;
	public ageManual:string;
	public distanceManual:string;
	public startDate:Date;
	
	constructor(
		@Inject(MAT_DIALOG_DATA) public data:ReceiptModel,
		private workItemService:WorkItemService,
		private diaRef:MatDialogRef<void>
	) {
		this.WorkItem = data;
	}
	
	public save() {
		this.Loading = true;
		var model:AddRepeatingSettings = {
			TypeId: this.repeatGroup,
			Id:this.WorkItem.Id
		};
		
		if(this.repeatGroup == "age") {
			model.Amount = this.ageGroup||this.ageManual;
			model.Offset = this.startDate;
		}
		else if(this.repeatGroup == "mileage") {
			model.Amount = this.distanceGroup||this.distanceManual;
		}
		
		this.workItemService.setRepeat(model, this.WorkItem.Id).subscribe(() =>{
			this.diaRef.close()
		}, err => {
			this.Loading = false;
			this.Error = err;
		})
	}
}