import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/LoginService';
import { LoginForm } from './Login/Login';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app',
	template: require('./app.html'),
	//providers: [ LoginService ]
})
export class AppComponent implements OnInit {
	public constructor() { }
	
	public ngOnInit() {
		//if(!this.LoginService.IsLoggedIn()) {
		//	setTimeout(() => {
		//		this.router.navigate(['/login']);
		//	}, 0);
		//}
		//else {
		//	setTimeout(() => {
		//		this.router.navigate(['/home']);
		//	}, 0);
		//}
	}
}