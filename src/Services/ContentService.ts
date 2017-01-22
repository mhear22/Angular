import { ServiceBase } from './ServiceBase';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injector, Injectable  } from '@angular/core';

@Injectable()
export class ContentService extends ServiceBase {
	constructor(protected http:Http) {
		super(http);
	}
	
	public GetContent() :Observable<any> {
		return this.Post("");
	}
}