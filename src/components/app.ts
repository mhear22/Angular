import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/LoginService';
import { LoginForm } from './Login/Login';
import { Router } from '@angular/router';

@Component({
	selector: 'app',
	templateUrl: './components/app.html',
	providers: [ LoginService ]
})
export class AppComponent extends OnInit {
	public constructor(private LoginService:LoginService, private router:Router) {
		super();
	}
	
	public IsLoggedIn():boolean {
		return this.LoginService.IsLoggedIn();
	}
	
	public ngOnInit() {
		if(!this.LoginService.IsLoggedIn()) {
			this.router.navigate(['/login']);
		}
	}
}