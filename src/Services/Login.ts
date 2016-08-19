import { Injectable } from '@angular/core';
import { LoginModel } from '../Models/LoginModel'
import { ServiceBase } from './ServiceBase'

@Injectable()
export class LoginService extends ServiceBase {
	private Users: LoginModel[];
	
	constructor() {
		super();
		this.Users = [
			new LoginModel()
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