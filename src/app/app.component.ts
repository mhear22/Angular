import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/Services/LoginService';
import { Router, ActivatedRoute } from '@angular/router';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	constructor(
		private LoginService:LoginService,
		private router:Router,
		angulartics:Angulartics2GoogleGlobalSiteTag
	) {
		angulartics.startTracking();
	}
	
	ngOnInit() {
		var loggedIn = this.LoginService.IsLoggedIn();
		
		if(!loggedIn) {
			setTimeout(() => {
				this.router.navigate(['/login']);
			}, 0);
		}
		else {
			setTimeout(() => {
				//this.router.navigate(['/home']);
			}, 0);
		}
	}
}
