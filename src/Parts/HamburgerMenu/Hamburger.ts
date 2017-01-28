import { Component, Inject, Input } from '@angular/core';

@Component({
	selector: 'hamburger',
	templateUrl: './Parts/HamburgerMenu/Hamburger.html'
})
export class Hamburger {
	@Input() open: boolean;
}
