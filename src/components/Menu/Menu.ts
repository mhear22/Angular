import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'menu',
	templateUrl: './components/Menu/Menu.html'
})
export class MenuBar {
	constructor(private router: Router) { }
}
