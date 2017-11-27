import { Component, Inject, Input } from '@angular/core';

@Component({
	selector: 'hamburger',
	template: require('./Hamburger.html')
})
export class Hamburger {
	@Input() open: boolean;
}
