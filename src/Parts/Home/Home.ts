import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../Services/ContentService';
import { Client } from 'src/Services/Api/Api';

@Component({
	selector: 'home',
	templateUrl: './Home.html',
	providers: [ ContentService ]
})
export class Home implements OnInit {
	constructor(protected contentService:ContentService, protected client:Client) { }
	
	public ngOnInit() {
		this.client.vinByVinGet("JN1MS36P0MW002130").subscribe(x=> {
			console.log(x);
		})
		
		//this.contentService.GetContent();
	}
}