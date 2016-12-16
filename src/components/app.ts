import { Component } from '@angular/core';
import { LoginService } from '../Services/LoginService';
import { LoginForm } from './Login/Login'

@Component({
	selector: 'app',
	templateUrl: './components/app.html',
	providers: [ LoginService ]
})
export class AppComponent {
	public constructor(public LoginService:LoginService) { }
	
	public IsLoggedIn():boolean {
		return this.LoginService.IsLoggedIn();
	}
}