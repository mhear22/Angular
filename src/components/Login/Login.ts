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
	
	constructor(@Inject(LoginService) private login: LoginService) { }
	
	public Login() {
		this.login.Login(this.username, this.password).then(()=>this.LoggedIn());
	}
	
	private LoggedIn() {
		
	}
}
