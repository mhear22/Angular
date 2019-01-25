import { Component } from '@angular/core';
import { LoginService } from "../../Services/LoginService";
import { CreateUserModel } from "../../Models/User/CreateUserModel";
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
	selector: 'Signup',
	templateUrl: './Signup.html',
	providers: [ LoginService ]
})
export class Signup {
	public accepted:boolean = false;
	public model:CreateUserModel = new CreateUserModel();
	
	constructor(private login:LoginService, private router: Router) { }
	public Submit() {
		this.login.CreateUser(this.model).subscribe(() => {
			this.router.navigate(['/login']);
		});
	}
}