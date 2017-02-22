import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { UserModel } from '../../Models/User/UserModel';
import { LoginService } from '../../Services/LoginService';
import { UploadFileDialog } from '../Dialog/Upload/Upload';
import { PasswordChangeModel } from '../../Models/User/PasswordChangeModel';

@Component({
	selector: 'Profile',
	templateUrl: './Parts/Profile/Profile.html'
})
export class Profile {
	constructor(private UserService: LoginService, private mdDialog:MdDialog) {
		this.Refresh();
	}
	
	public NewPassword: string;
	public OldPassword: string;
	public CurrentUser: UserModel = new UserModel(); 
	
	public Refresh() {
		this.UserService.GetCurrentUser().subscribe(result => {
			var data = <UserModel>result;
			this.CurrentUser = data;
		});
	}
	
	public UploadImage() {
		var model =  this.mdDialog.open(UploadFileDialog);
		model.afterClosed().subscribe(x=>{
			var z = x;
		});
	}
	
	public Update() {
		this.UserService.UpdateUser(this.CurrentUser.Id, this.CurrentUser).subscribe(x=>{
			this.Refresh();
		});
	}
	
	public ChangePassword() {
		var model = new PasswordChangeModel();
		model.NewPassword = this.NewPassword;
		model.OldPassword = this.OldPassword;
		this.UserService.ChangePassword(this.CurrentUser.Id, model).subscribe(x=>{
			this.Refresh();
		});
	}
}