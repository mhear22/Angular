import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/Services/LoginService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor(private LoginService:LoginService, private router:Router) { }
	
	ngOnInit() {
		var loggedIn = this.LoginService.IsLoggedIn();
		
		if(!loggedIn) {
			setTimeout(() => {
				//this.router.navigate(['/login']);
			}, 0);
		}
		else {
			setTimeout(() => {
				//this.router.navigate(['/home']);
			}, 0);
		}
	}
}
