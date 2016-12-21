import { Component } from '@angular/core';
import { User } from '../User/User';
import { UserModel } from '../../Models/User/UserModel';
import { LoginService } from '../../Services/LoginService';

@Component({
	selector: 'Profile',
	templateUrl: './components/Profile/Profile.html',
	providers: [ User ]
})
export class Profile {
	constructor(private UserService: LoginService) {
		this.UserService.GetCurrentUser().subscribe(result => {
			var data = <UserModel>result;
			this.CurrentUser = data;
		})
	}
	CurrentUser: UserModel = new UserModel(); 
}