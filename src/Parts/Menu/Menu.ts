import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';

@Component({
	selector: 'menu',
	templateUrl: './Parts/Menu/Menu.html',
	providers: [ LoginService ]
})
export class MenuBar {
	constructor(private login: LoginService, private router: Router) {
		this.Refresh();
	}
	
	private IsLoggedIn: boolean = false; 
	
	public Refresh():void {
		this.IsLoggedIn = this.login.IsLoggedIn();
	}
	
	public Logout() {
		this.login.Logout();
		this.router.navigate(['/home']);
	}
}
