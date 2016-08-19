import { Injectable } from '@angular/core';
import { LoginModel } from '../Models/LoginModel'
import { ServiceBase } from './ServiceBase'

@Injectable()
export class LoginService implements ServiceBase {
	private Users: LoginModel[];
	
	constructor() {
		let model = new LoginModel();
		model.Name = "Bob";
		model.Password = "Password 1";
		
		this.Users = [
			{
				Password : 'Password',
				Name: 'Username'
			}
		]
	}
	
	Get(): LoginModel{
		return this.Users[0];
	}
	
	Post(model: LoginModel): String {
		this.Users.push(model);
		return this.Users.length.toString();
	}
}