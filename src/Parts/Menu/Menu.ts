import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';
import { ServiceBase } from '../../Services/ServiceBase';
import { Observable } from 'rxjs';
import { HomeItemModel } from 'src/Models/HomeItemModel';
import { PaymentService } from 'src/Services/Api/Api';

@Component({
	selector: 'menu',
	templateUrl: './Menu.html'
})
export class MenuBar {
	constructor(
		private login: LoginService,
		private router: Router
	) {
		this.Refresh();
		ServiceBase.ApiKeyChange.subscribe(x=>{
			this.IsLoggedIn = x;
		});
	}
	
	private Items:HomeItemModel[] = [
		{
			Name:"Home",
			IconClass:"fa fa-home",
			Route:"/home",
			RequiresLogin:true,
			RequiresPlan:true,
			Allowed:true
		},
		{
			Name:"Add Car",
			IconClass:"fa fa-car",
			Route:"/add-car",
			Allowed:true,
			RequiresLogin:true,
			RequiresPlan:true,
		},
		{
			Name:"Profile",
			IconClass:"fa fa-user",
			Route:"profile",
			Allowed:true,
			RequiresLogin:true,
			RequiresPlan:false,
		},
		{
			Name:"Settings",
			IconClass:"fa fa-cog",
			Route:"/settings",
			Allowed:true,
			RequiresLogin:true,
			RequiresPlan:true,
		},
		{
			Name:"Sign Out",
			IconClass:"fa fa-sign-out",
			Action:() => {
				this.Logout();
			},
			Allowed:true,
			RequiresLogin:true,
			RequiresPlan:false,
		},
		{
			Name:"Sign In",
			IconClass:"fa fa-sign-in",
			Route:"/login",
			Allowed:true,
			RequiresLogin:false,
			RequiresPlan:false,
			Invert:true
		}
	];
	
	public Check():void {
		this.Items.forEach(x=> {
			var result = null;
			if(x.RequiresLogin && x.RequiresPlan) {
				var IsLoggedIn = this.IsLoggedIn == true;
				var IsSubscribed = this.IsSubscribed == true;
				
				result = IsLoggedIn && IsSubscribed;
				
				//result = !((!this.IsLoggedIn) || (!this.IsSubscribed));
			}
			else if(x.RequiresLogin) {
				result = this.IsLoggedIn;
			}
			else if(x.RequiresPlan) {
				
			}
			
			if(result != null) {
				if(x.Invert) {
					x.Allowed = !result
				}
				else
					x.Allowed = result;
			}
			else {
				x.Allowed = true;
			}
			
		});
	}
	
	
	IsLoggedIn: boolean = false; 
	IsSubscribed: boolean = false;
	
	public Refresh():void {
		this.IsLoggedIn = this.login.IsLoggedIn();
		if(this.IsLoggedIn) {
			this.login.GetCurrentUser().subscribe(x=> {
				this.IsSubscribed = !!x.PlanNickname
				this.Check();
			},()=> {
				this.Check();
			});
		}
		else {
			this.Check();
		}
	}
	
	public Logout() {
		try{
			this.login.Logout();
		}
		catch (ex) { }
		this.router.navigate(['/home']);
		this.Refresh();
	}
}
