import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/Http';
import { LoginModel } from '../Models/LoginModel';
import { ServiceBase } from './ServiceBase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService extends ServiceBase {

	constructor(@Inject(Http) private http: Http) {
		super();
	}
	
	public Login(Username:string, Password:string) {
		var model = {Username: Username, Password: Password};
		
		return this.http
			.post(this.ApiUrl + "sessions",model)
			.catch(this.CatchErrors);
	}
	
	public CreateUser(Username:string, Password:string, Email:string)
	{
		var model = {Username:Username, Password:Password,Email:Email};
		
		return this.http
			.post(this.ApiUrl + "users", model)
			.catch(this.CatchErrors);
	}
	
	private CatchErrors(error: any){
		return Observable.throw("An error Occured")
	}
}