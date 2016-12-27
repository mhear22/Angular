import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/LoginService';
import { LoginForm } from './Login/Login';
import { Router } from '@angular/router';

@Component({
	selector: 'app',
	templateUrl: './Parts/app.html',
	providers: [ LoginService ]
})
export class AppComponent implements OnInit {
	public constructor(private LoginService:LoginService, private router:Router) { }
	
	public IsLoggedIn():boolean {
		return this.LoginService.IsLoggedIn();
	}
	
	public ngOnInit() {
		if(!this.LoginService.IsLoggedIn()) {
			setTimeout(() => {
				this.router.navigate(['/login']);
			}, 0);
		}
	}
}