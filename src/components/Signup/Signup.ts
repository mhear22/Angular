import { Component } from '@angular/core';
import { LoginService } from "../../Services/LoginService";
import { UserModel } from "../../Models/User/UserModel";
import { Router } from '@angular/router';

@Component({
	selector: 'Signup',
	templateUrl: './components/Signup/Signup.html',
})
export class Signup {
	public email:string;
	public password:string;
	public username:string;
	
	constructor(private login:LoginService, private router: Router) { }
	public Submit() {
		var model = new UserModel();
		model.Email = "";
		model.Password = "";
		model.Username = "";
		this.login.CreateUser(model).then(function(success){
			this.router.navigate(['/home']);
		});
	}
}