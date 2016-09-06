import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/Http';
import { LoginModel } from '../Models/LoginModel';
import { ServiceBase } from './ServiceBase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService extends ServiceBase {
	private Users: LoginModel[];
	
	constructor(/*private Http: Http*/) {
		super();
		this.Users = [
			{
				Password : 'Password',
				Name: 'Username'
			}
		]
	}
	
	public Login(Username:string, Password:string) {
		//var x = this.Http.get("abc")
		//	.catch(this.CatchErrors);
	}
	private CatchErrors(error: any){
		return Observable.throw("An error Occured")
	}
}