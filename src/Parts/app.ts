import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { LoginService } from '../Services/LoginService';
import { LoginForm } from './Login/Login';
import { Router } from '@angular/router';

@Component({
	selector: 'app',
	templateUrl: './Parts/app.html',
	providers: [ LoginService ]
})
export class AppComponent implements OnInit {
	public constructor(private LoginService:LoginService, private router:Router,angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) { }
	
	public IsLoggedIn():boolean {
		return this.LoginService.IsLoggedIn();
	}
	
	public ngOnInit() {
		if(!this.LoginService.IsLoggedIn()) {
			setTimeout(() => {
				this.router.navigate(['/login']);
			}, 0);
		}
		else {
			setTimeout(() => {
				this.router.navigate(['/home']);
			}, 0);
		}
	}
}