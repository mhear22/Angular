import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';
import { Observable } from 'rxjs';

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
		this.login.IsLoggedIn().subscribe(x=> this.IsLoggedIn = x);
	}
	
	public Logout() {
		this.login.Logout();
		this.router.navigate(['/home']);
	}
}
