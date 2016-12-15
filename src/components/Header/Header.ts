import { Component, Inject } from '@angular/core';
import { ServiceBase } from '../../Services/ServiceBase';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';

@Component({
	selector: 'header-bar',
	templateUrl: './components/Header/Header.html',
	providers: [ LoginService ]
})

export class Header {
	constructor(private router:Router, private loginService: LoginService) { }
	public GoHome() {
		if(this.loginService.IsLoggedIn()){
			this.router.navigate(['/home']);
		}
		else {
			this.router.navigate(['/']);
		}
	}
}
