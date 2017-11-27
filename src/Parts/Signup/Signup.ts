import { Component } from '@angular/core';
import { LoginService } from "../../Services/LoginService";
import { CreateUserModel } from "../../Models/User/CreateUserModel";
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
	selector: 'Signup',
	template: require('./Signup.html'),
	providers: [ LoginService ]
})
export class Signup {
	public email:any = "";
	public password:any = "";
	public username:any = "";
	
	constructor(private login:LoginService, private router: Router) { }
	public Submit() {
		var model = new CreateUserModel();
		model.EmailAddress = this.email;
		model.Password = this.password;
		model.Username = this.username;
		this.login.CreateUser(model).subscribe(
			result => {
				this.router.navigate(['/login']);
			}
		)
	}
}