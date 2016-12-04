import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';
import { LoginModel } from '../../Models/User/LoginModel';

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
		var model = new LoginModel();
		model.Username = this.username;
		model.Password = this.password;
		this._loginService.Login(model).subscribe(result => {
			this.router.navigate(['/home']);
		})
	}
}
