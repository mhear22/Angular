import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
	templateUrl:'./PaymentReminder.html'
})
export class PaymentReminderDialog {
	constructor(
		private diaRef:MatDialogRef<void>,
		private router:Router
	) {}
	close() {
		this.diaRef.close()
		this.router.navigate(["/plans"])
	}
}