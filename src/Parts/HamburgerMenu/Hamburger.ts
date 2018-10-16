import { Component, Inject, Input } from '@angular/core';

@Component({
	selector: 'hamburger',
	templateUrl: './Hamburger.html'
})
export class Hamburger {
	@Input() open: boolean;
}
