import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { UserModel } from '../../Models/User/UserModel';
import { LoginService } from '../../Services/LoginService';
import { DialogService } from '../../Services/DialogService';
import { ImageService } from '../../Services/ImageService';
import { environment } from 'src/environments/environment';
import { PaymentService, PaymentPlanModel } from 'src/Services/Api/Api';

@Component({
	selector: 'Profile',
	templateUrl: './Profile.html'
})
export class Profile implements OnInit {
	constructor(
		private UserService: LoginService, 
		private viewContainerRef: ViewContainerRef,
		private imageService: ImageService,
		private dialogService:DialogService,
		private paymentService:PaymentService
	) {
	}
	private handler:any;
	public NewPassword: string;
	public OldPassword: string;
	public CurrentUser: UserModel = new UserModel(); 
	public ProfileImageUrl:string = null;
	public plans:PaymentPlanModel[];
	
	public ngOnInit() {
		this.Refresh();
	}
	
	public Refresh() {
		this.UserService.GetCurrentUser().subscribe(result => {
			var data = <UserModel>result;
			this.CurrentUser = data;
			if(data.ImageId) {
				this.ProfileImageUrl = this.imageService.GetImageUrl(data.ImageId);
			}
		});
		
		this.paymentService.getPlans().subscribe(x=> {
			this.plans = x;
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
		this.UserService.ChangePassword(this.CurrentUser.Id, {
			NewPassword: this.NewPassword,
			OldPassword: this.OldPassword
		}).subscribe(x=>{
			this.Refresh();
		});
	}
	
	public onPay() {
		this.handler.open({
			name:"Test Sub",
			excerpt:'Test info',
			amount:"100",
			description:""
		});
	}
}