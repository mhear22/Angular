import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../Services/ContentService';
import { VinClient } from 'src/Services/Api/Api';

@Component({
	selector: 'home',
	templateUrl: './Home.html',
	providers: [ ContentService ]
})
export class Home implements OnInit {
	constructor(protected contentService:ContentService, protected vinClient:VinClient) { }
	
	public ngOnInit() {
		this.vinClient.getVin("JN1MS36P0MW002130").subscribe(x=> {
			console.log(x);
		});
		
		//this.contentService.GetContent();
	}
}