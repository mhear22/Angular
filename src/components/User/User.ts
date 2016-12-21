import { Component, Input } from '@angular/core';
import { UserModel } from '../../Models/User/UserModel';

@Component({
	selector: 'user',
	templateUrl: './components/User/User.html'
})
export class User {
	@Input() user: UserModel;
	constructor() { }
}