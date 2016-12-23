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
		this.Refresh();
	}
	
	public Refresh() {
		this.UserService.GetCurrentUser().subscribe(result => {
			var data = <UserModel>result;
			this.CurrentUser = data;
		});
	}
	
	public Update() {
		this.UserService.UpdateUser(this.CurrentUser.Id, this.CurrentUser).subscribe(x=>{
			this.Refresh();
		});
	}
	CurrentUser: UserModel = new UserModel(); 
}