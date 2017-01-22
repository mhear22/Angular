import { Injector, Injectable  } from '@angular/core';
import { Http } from '@angular/http';
import { ServiceBase } from './ServiceBase';
import { Observable } from 'rxjs/Observable';
import { LoginModel } from '../Models/User/LoginModel';
import { CreateUserModel } from '../Models/User/CreateUserModel';
import { UserModel } from '../Models/User/UserModel';
import { PasswordChangeModel } from '../Models/User/PasswordChangeModel';
import { LocalStorageService } from 'ng2-webstorage';

@Injectable()
export class LoginService extends ServiceBase {
	
	constructor(protected http:Http, private local:LocalStorageService) {
		super(http);
		
		var key = this.local.retrieve("api_key");
		if(key !== null)
			ServiceBase.ApiKey = key;
	}
	
	public UpdateUser(Id: string, Model: UserModel) {
		return this.Put("users/" + Id, null, Model);
	}
	
	public Login(model: LoginModel): Observable<string> {
		var query = this.Post("sessions",null,model);
		query.subscribe(result => {
			this.local.store("api_key", result);
			ServiceBase.ApiKey = result;
		});
		return query;
	}
	
	public ChangePassword(Id: string, RequestModel: PasswordChangeModel) {
		return this.Post("user/" + Id + "/password", null, RequestModel);
	}
	
	private stillLive:boolean = false;
	
	public IsLoggedIn(): Observable<boolean> {
		if(this.stillLive)
			return Observable.of(this.stillLive);
		else
			return this.GetCurrentUser().map(x=> {
				var isLive = x.EmailAddress?true:false;
				this.stillLive = isLive;
				return isLive;
			});
	}
	
	public Logout() {
		var query = this.Delete("sessions", { Token: ServiceBase.ApiKey });
		query.subscribe(result => {
			this.local.clear("api_key");
			ServiceBase.ApiKey = "";
		});
		return query;
	}
	
	public GetCurrentUser(): Observable<UserModel> {
		return this.Get("currentuser");
	}
	
	public GetUser(NameOrId:string):Observable<any> {
		return this.Get("users/" + NameOrId);
	}
	
	public CreateUser(model:CreateUserModel) {
		return this.Post("users",null,model);
	}
}