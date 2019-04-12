import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { FeedbackService, FeedbackModel } from 'src/Services/Api/Api';
import { LoginService } from 'src/Services/LoginService';

@Component({
	templateUrl:'./RecieveFeedback.html'
})
export class RecieveFeedbackDialog {
	constructor(
		private diaRef:MatDialogRef<void>,
		private feedbackService:FeedbackService,
		private loginService:LoginService
	) {}
	
	private Message:string;
	private Loading:boolean = false;
	
	save() {
		this.Loading = true;
		var info:FeedbackModel = {
			Feedback: this.Message,
			Url:window.location.href
		};
		
		this.loginService.GetCurrentUser().subscribe(x=>{
			info.UserId = x.Id;
			this.feedbackService.sendFeedback(info).subscribe(() => {
				this.diaRef.close()
			},() => { this.Loading = false; })
		}, () =>
		this.feedbackService.sendFeedback(info).subscribe(()=> {
			this.diaRef.close()
		}))
	}
}