import { Component, OnInit } from "@angular/core";
import { PaymentService, PaymentPlanModel } from "src/Services/Api/Api";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { LoginService } from "src/Services/LoginService";

@Component({
	selector:'payment-plans',
	templateUrl:'./Plans.html'
})
export class PaymentPlans implements OnInit {
	constructor(
		private paymentService:PaymentService,
		private router:Router,
		private loginService:LoginService
	) { }
	
	private plans:PaymentPlanModel[];
	private handler:any;
	private selectedPlan:PaymentPlanModel;
	private Loading:boolean = false;
	private CurrentPlan:string;
	
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
			data.email = x.EmailAddress;
			this.CurrentPlan = x.PlanNickname;
			this.handler = StripeCheckout.configure(data)
		},() => {
			this.handler = StripeCheckout.configure(data)
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