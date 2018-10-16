import { ServiceBase } from './ServiceBase';
import { Http } from '@angular/http';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ContentModel } from '../models/ContentModel'

@Injectable()
export class ContentService extends ServiceBase {
	constructor(protected http:Http) {
		super(http);
	}
	
	public GetContent() :Observable<ContentModel[]> {
		var p = new Promise<ContentModel[]>((resolve, reject) => {
			resolve([
				{ Name: "1", Text: "" },
				{ Name: "2 ", Text: "" }
			]);
		});
		
		
		
		return from(p);
	}
}