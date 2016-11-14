import { Injector, Injectable  } from '@angular/core';
import { Http } from '@angular/http';
import { ServiceBase } from './ServiceBase';
import { Observable } from 'rxjs/Observable';
import { LoginModel } from '../Models/User/LoginModel';
import { UserModel } from '../Models/User/UserModel';

@Injectable()
export class LoginService extends ServiceBase {
	
	constructor(private http:Http) {
		super();
	}
	
	public Login(model: LoginModel) {
		return this.http.post(ServiceBase.ApiUrl + "users",model)
			.toPromise();
	}
	
	public CreateUser(model:UserModel) {
		
	}
	
	public DoThing() {
		this.http.get(ServiceBase.ApiUrl + "status")
			.toPromise()
			.then(function(success){
			}, null);
	}
	//public constructor(private http: Http) {
	//	//super();
	//}
	
	//
	//public Login(Username:string, Password:string) : Promise<string> {
	//	var model = {Username: Username, Password: Password};
	//	
	//	return this.http
	//		.post(this.ApiUrl + "sessions",model)
	//		.catch(this.CatchErrors)
	//		.toPromise()
	//		.then(x=>x.json() as string);
	//}
	//
	//public CreateUser(Username:string, Password:string, Email:string) {
	//	var model = {Username:Username, Password:Password,Email:Email};
	//	
	//	return this.http
	//		.post(this.ApiUrl + "users", model)
	//		.catch(this.CatchErrors);
	//}
	//
	//private CatchErrors(error: any){
	//	return Observable.throw("An error Occured")
	//}
}