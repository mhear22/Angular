import { Component, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserModel } from '../../Models/User/UserModel';
import { LoginService } from '../../Services/LoginService';
import { DialogService } from '../../Services/DialogService';
import { ImageService } from '../../Services/ImageService';
import { UploadFileDialog } from '../Dialog/Upload/Upload';
import { PasswordChangeModel } from '../../Models/User/PasswordChangeModel';

@Component({
	selector: 'Profile',
	template: require('./Profile.html')
})
export class Profile {
	constructor(
		private UserService: LoginService, 
		private viewContainerRef: ViewContainerRef,
		private imageService: ImageService,
		private dialogService:DialogService) {
		this.Refresh();
	}
	
	public NewPassword: string;
	public OldPassword: string;
	public CurrentUser: UserModel = new UserModel(); 
	public ProfileImageUrl:string = null;
	
	public Refresh() {
		this.UserService.GetCurrentUser().subscribe(result => {
			var data = <UserModel>result;
			this.CurrentUser = data;
			if(data.ImageId) {
				this.ProfileImageUrl = this.imageService.GetImageUrl(data.ImageId);
			}
		});
	}
	
	public UploadImage() {
		var model =  this.dialogService.SubmitFile(this.viewContainerRef)
		model.subscribe(x=>{
			if(x) {
				this.ProfileImageUrl = this.imageService.GetImageUrl(x.Id);
				this.CurrentUser.ImageId = x.Id;
				this.UserService.UpdateUser(this.CurrentUser.Id, this.CurrentUser).subscribe();
			}
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