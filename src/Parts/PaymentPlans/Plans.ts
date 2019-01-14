import { Component, OnInit } from "@angular/core";
import { PaymentService, PaymentPlanModel } from "src/Services/Api/Api";

@Component({
	selector:'payment-plans',
	templateUrl:'./Plans.html'
})
export class PaymentPlans implements OnInit {
	constructor(
		private paymentService:PaymentService
	) { }
	
	private plans:PaymentPlanModel[];
	
	public ngOnInit() { this.Refresh(); }
	public Refresh() {
		this.paymentService.getPlans().subscribe(x=>{
			this.plans = x;
		});
	}
}