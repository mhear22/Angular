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
		if(!this.LoginService.IsLoggedIn()) {
			setTimeout(() => {
				this.router.navigate(['/login']);
			}, 0);
		}
		else {
			setTimeout(() => {
				this.router.navigate(['/home']);
			}, 0);
		}
	}
}
