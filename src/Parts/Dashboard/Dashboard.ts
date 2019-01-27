import { Component, OnInit } from '@angular/core';
import { CarService, OwnedCarModel } from 'src/Services/Api/Api';
import { LoginService } from 'src/Services/LoginService';
import { Router } from '@angular/router';

@Component({
	selector: 'home',
	templateUrl: './Dashboard.html',
	providers: []
})
export class Dashboard implements OnInit {
	constructor(
		private CarService: CarService,
		private LoginService: LoginService,
		private router:Router
	) { }

	public Cars: OwnedCarModel[];
	public LoggedIn = true;
	public Loading = true;

	public ngOnInit() {
		var isLoggedIn = this.LoginService.IsLoggedIn();
		if (isLoggedIn) {
			this.LoginService.GetCurrentUser().subscribe(currentUser => {
				this.CarService.getForUser(currentUser.Id).subscribe(carlist => {
					this.Loading = false;
					this.Cars = carlist.Items;
				});
			});
			this.LoginService.GetCurrentUser().subscribe(x=>{
				if(!x.PlanNickname) {
					this.router.navigate(["/profile"]);
				}
			});
		}
		else {
			this.LoggedIn = false;
		}
	}
}