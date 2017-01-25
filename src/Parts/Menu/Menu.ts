import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';
import { ServiceBase } from '../../Services/ServiceBase';
import { Observable } from 'rxjs';

@Component({
	selector: 'menu',
	templateUrl: './Parts/Menu/Menu.html',
	providers: [ LoginService ]
})
export class MenuBar {
	constructor(private login: LoginService, private router: Router) {
		this.Refresh();
		ServiceBase.ApiKeyChange.subscribe(x=>{
			this.IsLoggedIn = x;
		});
	}
	
	private IsLoggedIn: boolean = false; 
	
	public Refresh():void {
		this.login.IsLoggedIn().subscribe(x=> this.IsLoggedIn = x);
	}
	
	public Logout() {
		try{
			this.login.Logout();
		}
		catch (ex) { }
		this.router.navigate(['/home']);
	}
}
