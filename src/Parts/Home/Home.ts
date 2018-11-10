import { Component, OnInit } from '@angular/core';
import { CarService, OwnedCarModel } from 'src/Services/Api/Api';
import { LoginService } from 'src/Services/LoginService';

@Component({
	selector: 'home',
	templateUrl: './Home.html',
	providers: []
})
export class Home implements OnInit {
	constructor(
		private CarService: CarService,
		private LoginService: LoginService
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
		}
		else {
			this.LoggedIn = false;
		}
	}
}