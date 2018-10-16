import { Http, Response, Headers } from '@angular/http';
import { Subject } from 'rxjs';
import { UrlChainer } from './UrlChainer';
import 'rxjs/add/operator/map';

export class ServiceBase {
	public static ApiUrl:string;
	
	private static _ApiKey:string = "";
	public static set ApiKey(val:string){
		ServiceBase._ApiKey = val;
		if(val == "")
			ServiceBase.ApiKeyChange.next(false);
		else
			ServiceBase.ApiKeyChange.next(true);
	}
	public static get ApiKey():string {
		return ServiceBase._ApiKey;
	}
	public static ApiKeyChange: Subject<boolean> = new Subject<boolean>();
	
	constructor(protected http:Http) {
		//ServiceBase.ApiUrl = "http://mckayhear.es:5000/";
		ServiceBase.ApiUrl = "http://" + window.location.hostname + ":5000/";
	}
	
	private getHeaders(headers: Headers) {
		headers.append("Content-Type","application/json");
		return headers;
	}
	
	private GetUrl(endpoint:string, params:any=null): string {
		if(!params){
			params = {};
		}
		var url = ServiceBase.ApiUrl + endpoint;
		var x = new UrlChainer(url);
		if(ServiceBase.ApiKey)
			params.api_key = ServiceBase.ApiKey;
		x.FromModel(params);
		return x.GetUrl();
	}
	
	protected Get(endpoint:string,params:any=null) {
		var url = this.GetUrl(endpoint, params);
		return this.http
			.get(url,{headers:this.getHeaders(new Headers())})
			.map(this.extract);
	}
	
	protected Post(endpoint: string, params:any=null, model:any=null) {
		var url = this.GetUrl(endpoint,params);
		return this.http
			.post(url,model,{ headers: this.getHeaders(new Headers()) })
			.map(this.extract);
	}
	
	protected Delete(endpoint: string, params:any=null) {
		var url = this.GetUrl(endpoint, params);
		return this.http.delete(url, { headers: this.getHeaders(new Headers()) })
		.map(this.extract);
	}
	
	protected Put(endpoint:string, params:any=null, model:any=null) {
		var url = this.GetUrl(endpoint, params);
		return this.http.put(url,model, { headers: this.getHeaders(new Headers()) })
		.map(this.extract);
	}
	
	private extract(res: Response) {
		let body = res.json();
		return body || { };
	}
}