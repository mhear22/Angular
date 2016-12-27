import { Component, Input } from '@angular/core';
import { UserModel } from '../../Models/User/UserModel';

@Component({
	selector: 'user',
	templateUrl: './Parts/User/User.html'
})
export class User {
	@Input() user: UserModel;
	@Input() editable: boolean;
	constructor() { }
}