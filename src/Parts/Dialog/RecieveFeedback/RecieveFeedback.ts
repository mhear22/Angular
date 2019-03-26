import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { FeedbackService } from 'src/Services/Api/Api';
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
		this.loginService.GetCurrentUser().subscribe(x=>{
			this.feedbackService.sendFeedback({
				Feedback: this.Message,
				UserId: x.Id,
				Url:window.location.href
			}).subscribe(() => {
				this.diaRef.close()
			},() => { this.Loading = false; })
		},() => { this.Loading = false; })
		
	}
}