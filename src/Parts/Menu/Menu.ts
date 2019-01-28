import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';
import { ServiceBase } from '../../Services/ServiceBase';
import { Observable, interval } from 'rxjs';
import { HomeItemModel } from 'src/Models/HomeItemModel';
import { PaymentService } from 'src/Services/Api/Api';

@Component({
	selector: 'menu',
	templateUrl: './Menu.html'
})
export class MenuBar implements OnInit {
	constructor(
		private login: LoginService,
		private router: Router
	) {
		interval(1000).subscribe(() => {
			this.Check();
		})
	}
	
	public ngOnInit() {
		this.Refresh();
	}
	
	public Items:HomeItemModel[] = [
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
			Route:"/profile",
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
			Disabled:true
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
	].map(x=>{
		if(x.Action == null)
			x.Action = () => {}
		return x;
	});
	
	public Check():void {
		this.Items.forEach(x=> {
			var result = null;
			if(x.RequiresLogin && x.RequiresPlan) {
				var IsLoggedIn = this.IsLoggedIn == true;
				var IsSubscribed = this.IsSubscribed == true;
				result = IsLoggedIn && IsSubscribed;
			}
			else if(x.RequiresLogin) {
				result = this.IsLoggedIn;
			}
			else if(x.RequiresPlan) {
				result = this.IsSubscribed;
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
			
			if(x.Disabled) {
				x.Allowed = false;
			}
		});
		
		this.Items.forEach(x=> {
			if(x.Name == "Sign In" && x.Allowed) {
				x.Allowed = !this.IsLoggedIn;
			}
		});
	}
	
	
	
	get IsLoggedIn(): boolean {
		return this.login.IsLoggedIn();
	};
	get IsSubscribed(): boolean {
		return LoginService.IsSubscribed;
	}
	
	public Refresh():void {
		//this.IsLoggedIn = this.login.IsLoggedIn();
		if(this.IsLoggedIn) {
			this.login.GetCurrentUser().subscribe(x=> {
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
