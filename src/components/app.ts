import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '../Services/LoginService';
import { LoginModel } from '../Models/LoginModel';

@Component({
	selector: 'app',
	templateUrl: './components/app.html',
	providers: [ LoginService ]
})
export class AppComponent implements OnInit {
	title = 'Title';
	users:LoginModel[] = [];
	
	constructor(@Inject(LoginService) private login: LoginService) { }
	
	getUsers(): void{
		this.users[0] = this.login.Get();
	}
	
	ngOnInit():void {
		this.getUsers();
	}
}