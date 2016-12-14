import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';

@Component({
	selector: 'menu',
	templateUrl: './components/Menu/Menu.html',
	providers: [ LoginService ]
})
export class MenuBar {
	constructor(private login: LoginService, private router: Router) { }
	
	public Logout() {
		this.login.Logout();
		this.router.navigate(['/login']);
	}
}
