import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';
import { LoginModel } from '../../Models/User/LoginModel';

@Component({
	selector: 'login',
	templateUrl: './Login.html',
	providers: [ LoginService ]
})
export class LoginForm {
	username:string = "";
	password:string = "";
	private IsLoading:boolean = false;
	constructor(private _loginService: LoginService, private router: Router) { }
	
	public Login() {
		this.IsLoading = true;
		var model = new LoginModel();
		model.Username = this.username;
		model.Password = this.password;
		this._loginService.Login(model).subscribe(result => {
			this.IsLoading = false;
			this.router.navigate(['/home']);
		}, error => {
			this.IsLoading = false;
		});
	}
}
