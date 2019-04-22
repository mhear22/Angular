import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ServiceBase } from './ServiceBase';
import { of, Observable } from 'rxjs';
import { CreateUserModel } from '../Models/User/CreateUserModel';
import { LocalStorageService } from 'ngx-webstorage';
import { SessionsService, LoginModel, UsersService, ChangePasswordModel, CurrentUserService, UserModel } from './Api/Api';

@Injectable()
export class LoginService extends ServiceBase {
	constructor(
		protected http:Http,
		private local:LocalStorageService,
		private sessionsService:SessionsService,
		private userService:UsersService,
		private currentUserService:CurrentUserService
	) {
		super(http);
		var key = this.local.retrieve("api_key");
		if(key !== null)
			ServiceBase.ApiKey = key;
	}
	
	public UpdateUser(Id: string, Model: UserModel) {
		return this.userService.updateUser(Id, Model);
	}
	
	public Login(model: LoginModel): Observable<string> {
		var query = this.sessionsService.login(model);
		return query.map(result => {
			this.local.store("api_key", result);
			ServiceBase.ApiKey = result;
			return result;
		});
	}
	
	public ChangePassword(Id: string, RequestModel: ChangePasswordModel) {
		return this.userService.changePassword(Id, RequestModel);
	}
	
	private stillLive:boolean = false;
	
	public static IsSubscribed:boolean = false;
	public IsLoggedIn(): boolean {
		return ServiceBase.ApiKey !== "";
	}
	
	public Logout() {
		var result = this.sessionsService.logout(ServiceBase.ApiKey);
		return result.map(result => {
			this.local.clear("api_key");
			ServiceBase.ApiKey = "";
		});
	}
	
	public GetCurrentUser() {
		var result = this.currentUserService.getCurrentUser();
		result.map(x=> {
			LoginService.IsSubscribed = !!x.PlanNickname;
			return x;
		});
		return result;
	}
	
	public GetUser(NameOrId:string) {
		return this.userService.getUser(NameOrId);
	}
	
	public CreateUser(model:CreateUserModel) {
		return this.userService.createUser(model);
	}
}