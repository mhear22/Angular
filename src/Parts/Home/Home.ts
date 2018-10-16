import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../Services/ContentService';

@Component({
	selector: 'home',
	templateUrl: './Home.html',
	providers: [ ContentService ]
})
export class Home implements OnInit {
	constructor(protected contentService:ContentService) { }
	
	public ngOnInit() {
		//this.contentService.GetContent();
	}
}