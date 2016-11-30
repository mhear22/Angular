import { Injector, Injectable  } from '@angular/core';
import { Http } from '@angular/http';
import { ServiceBase } from './ServiceBase';
import { Observable } from 'rxjs/Observable';
import { LoginModel } from '../Models/User/LoginModel';
import { UserModel } from '../Models/User/UserModel';

@Injectable()
export class LoginService extends ServiceBase {
	
	constructor(protected http:Http) {
		super(http);
	}
	
	public Login(model: LoginModel) {
		return this.Post(ServiceBase.ApiUrl + "users", model);
	}
	
	public CreateUser(model:UserModel) {
		return this.Post("users",null,model);
	}
}