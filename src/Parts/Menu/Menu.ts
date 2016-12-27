import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';

@Component({
	selector: 'menu',
	templateUrl: './Parts/Menu/Menu.html',
	providers: [ LoginService ]
})
export class MenuBar {
	constructor(private login: LoginService, private router: Router) { }
	public IsLoggedIn():boolean {
		return this.login.IsLoggedIn();
	}
	public Logout() {
		this.login.Logout();
		this.router.navigate(['/login']);
	}
}
