import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { PaymentService, PaymentPlanModel, UserModel } from "src/Services/Api/Api";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { LoginService } from "src/Services/LoginService";
import { MatDialog } from "@angular/material";
import { UnsubscribeDialog } from "../Dialog/Unsubscribe/Unsubscribe";
import { DialogService } from "src/Services/DialogService";

@Component({
	selector:'payment-plans',
	templateUrl:'./Plans.html'
})
export class PaymentPlans implements OnInit {
	constructor(
		private paymentService:PaymentService,
		private router:Router,
		private loginService:LoginService,
		private dialogService:DialogService,
		private viewContainerRef: ViewContainerRef
	) { }
	
	private plans:PaymentPlanModel[];
	private handler:any;
	private selectedPlan:PaymentPlanModel;
	public Loading:boolean = false;
	private CurrentPlan:string;
	private currentUser:UserModel;
	
	public ngOnInit() { this.Refresh(); }
	public Refresh() {
		this.Loading = true;
		this.paymentService.getPlans().subscribe(x=>{
			this.plans = x;
			this.Loading = false;
		});
		
		var data = {
			key:environment.stripeKey,
			locale:'auto',
			email:null,
			token:token=> {
				this.paymentService.processPayment({
					Token: token,
					PlanId:this.selectedPlan.Id
				}).subscribe(() => {
					this.router.navigate(['/profile']);
				});
			}
		};
		
		var login = this.loginService.GetCurrentUser();
		login.subscribe(x=> {
			this.currentUser = x;
			data.email = x.EmailAddress;
			this.CurrentPlan = x.PlanNickname;
			this.handler = StripeCheckout.configure(data)
		},() => {
			this.handler = StripeCheckout.configure(data)
		});
	}

	public cancelSub() {
		this.dialogService.Unsubscribe(this.viewContainerRef,this.currentUser.Id).subscribe(() => {
			this.router.navigate(['/profile']); 
		});
	}
	
	public selected(plan:PaymentPlanModel) {
		this.selectedPlan = plan;
		
		this.handler.open({
			name:"Subscription",
			amount:plan.Amount,
			description:"You are purchasing a " + plan.Name + " subscription."
		});
	}
}