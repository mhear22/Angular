import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';

@Component({
	selector: 'login',
	templateUrl: './Login.html',
	providers: [ LoginService ]
})
export class LoginForm {
	username:string = "";
	password:string = "";
	IsLoading:boolean = false;
	constructor(private _loginService: LoginService, private router: Router) { }
	
	public Login() {
		this.IsLoading = true;
		this._loginService.Login({
			Password: this.password,
			Username: this.username
		}).subscribe(result => {
			this.IsLoading = false;
			this.router.navigate(['/home']);
		}, error => {
			this.IsLoading = false;
		});
	}
}
