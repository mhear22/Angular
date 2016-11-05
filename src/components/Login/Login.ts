import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';

@Component({
	selector: 'login',
	templateUrl: './components/Login/Login.html',
	providers: [ LoginService ]
})
export class LoginForm {
	username:string = "";
	password:string = "";
	
	constructor(private _loginService: LoginService, private router: Router) { }
	
	public Login() {
		//this._loginService
		this.router.navigate(['/home'])
	}
	
	private LoggedIn() {
		
	}
}
