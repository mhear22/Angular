import { Http, Response, Headers } from '@angular/http';
import { Subject } from 'rxjs';
import { UrlChainer } from './UrlChainer';
import 'rxjs/add/operator/map';

export class ServiceBase {
	public static ApiUrl:string;
	
	private static _ApiKey:string = "";
	
	public static set ApiKey(val:string){
		ServiceBase._ApiKey = val;
	}
	
	public static get ApiKey():string {
		return ServiceBase._ApiKey;
	}
	
	public static ApiKeyChange: Subject<boolean> = new Subject<boolean>();
	
	constructor(protected http:Http) {
		//ServiceBase.ApiUrl = "http://mckayhear.es:5000/";
		ServiceBase.ApiUrl = "http://" + window.location.hostname + ":5000/";
	}
}