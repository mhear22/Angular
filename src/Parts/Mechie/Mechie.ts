import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { LoginService } from 'src/Services/LoginService';
import { Router } from '@angular/router';
import { DialogService } from 'src/Services/DialogService';

@Component({
	selector:'mechie',
	templateUrl:'./Mechie.html'
})
export class Mechie implements OnInit {
	constructor(
		private LoginService:LoginService,
		private Router:Router,
		private dialogService:DialogService,
		private viewContainerRef: ViewContainerRef
	) { }
	private loggedIn = false;
	private signoutLoading = false;
	ngOnInit() {
		this.loggedIn = this.LoginService.IsLoggedIn();
	}
	
	public signOut() {
		this.signoutLoading = true;
		this.LoginService.Logout().subscribe(x=> {
			this.signoutLoading = false;
			this.Router.navigate(['/']);
			this.ngOnInit();
		});
	}
	
	public feedback() {
		this.dialogService.RecieveFeedback(this.viewContainerRef,{})
	}
}