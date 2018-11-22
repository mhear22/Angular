import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';
import { ServiceBase } from '../../Services/ServiceBase';
import { Observable } from 'rxjs';

@Component({
	selector: 'menu',
	templateUrl: './Menu.html'
})
export class MenuBar {
	constructor(
		private login: LoginService,
		private router: Router
	) {
		this.Refresh();
		ServiceBase.ApiKeyChange.subscribe(x=>{
			this.IsLoggedIn = x;
		});
	}
	
	IsLoggedIn: boolean = false; 
	
	public Refresh():void {
		this.IsLoggedIn = this.login.IsLoggedIn();
	}
	
	public Logout() {
		try{
			this.login.Logout();
		}
		catch (ex) { }
		this.router.navigate(['/home']);
	}
}
