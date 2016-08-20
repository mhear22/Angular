import { Component, Inject } from '@angular/core';
import { LoginService } from '../../Services/LoginService';
import { LoginModel } from '../../Models/LoginModel';

@Component({
	selector: 'login',
	templateUrl: './components/Login/Login.html',
	providers: [ LoginService ]
})
export class LoginForm {
	username:String = "";
	password:String = "";
	
	constructor(@Inject(LoginService) private login: LoginService) { }
	
	Actions: {
		
	}
}
