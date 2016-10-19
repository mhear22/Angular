import { Component, Inject } from '@angular/core';
import { LoginService } from '../../Services/LoginService';

@Component({
	selector: 'login',
	templateUrl: './components/Login/Login.html',
	providers: [ LoginService ]
})
export class LoginForm {
	username:string = "";
	password:string = "";
	
	constructor(private _loginService: LoginService) { }
	
	public doThing() {
		this._loginService.DoThing();
	}
	
	private LoggedIn() {
		
	}
}
