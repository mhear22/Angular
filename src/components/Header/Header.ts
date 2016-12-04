import { Component, Inject } from '@angular/core';
import { ServiceBase } from '../../Services/ServiceBase';
import { Router } from '@angular/router';

@Component({
	selector: 'header-bar',
	templateUrl: './components/Header/Header.html',
})

export class Header {
	constructor(private router:Router) { }
	public IsLoggedIn() : boolean {
		if(ServiceBase.ApiKey === null){
			return false;
		}
		return true;
	}
	
	public GoHome() {
		if(this.IsLoggedIn()){
			this.router.navigate(['/home']);
		}
		else {
			this.router.navigate(['/']);
		}
	}
}
