import { ServiceBase } from './ServiceBase';
import { Http } from '@angular/http';

export class ContentService extends ServiceBase {
	constructor(protected http:Http) {
		super(http);
	}
}