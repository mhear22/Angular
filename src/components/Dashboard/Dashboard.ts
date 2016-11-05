import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'dashboard',
	templateUrl: './components/Dashboard/Dashboard.html',
})

export class Dashboard implements OnInit, OnDestroy {
	@Input() Id: string;
	private sub: Subscription;
	
	constructor(private activatedRoute: ActivatedRoute) { }
	
	public click() {
		alert(this.Id);
	}
	
	ngOnInit() {
		this.sub = this.activatedRoute.params.subscribe(((x:any) => {
			this.Id = x['Id'];
		}))
	}
	
	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
