import { ServiceBase } from './ServiceBase';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs';
import { Injector, Injectable  } from '@angular/core';
import { ContentModel } from '../Models/ContentModel'

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