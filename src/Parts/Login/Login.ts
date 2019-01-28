import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';
import { CurrentUserService } from 'src/Services/Api/Api';

@Component({
	selector: 'login',
	templateUrl: './Login.html',
	providers: [ LoginService ]
})
export class LoginForm {
	username:string = "";
	password:string = "";
	error:string = null;
	IsLoading:boolean = false;
	constructor(
		private _loginService: LoginService,
		private router: Router
	) { }
	
	public Login() {
		this.IsLoading = true;
		this._loginService.Login({
			Password: this.password,
			Username: this.username
		}).subscribe(result => {
			this._loginService.GetCurrentUser().subscribe(user=> {
				this.IsLoading = false;
				this.router.navigate(['/home']);
			}, error => {
				this.error = error;
				this.IsLoading = false
			});
		}, error => {
			this.error = error;
			this.IsLoading = false;
		});
	}
}
