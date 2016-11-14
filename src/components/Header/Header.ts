import { Component, Inject } from '@angular/core';
import { ServiceBase } from '../../Services/ServiceBase';

@Component({
	selector: 'header-bar',
	templateUrl: './components/Header/Header.html',
})

export class Header {
	constructor() { }
	public IsLoggedIn() : boolean {
		if(ServiceBase.ApiKey === null){
			return false;
		}
		return true;
	}
}
