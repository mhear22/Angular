import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UrlChainer } from './UrlChainer';

export class ServiceBase {
	public static ApiUrl:string = "http://localhost:5000/";
	public static ApiKey:string = "";
	
	constructor(protected http:Http) { }
	
	private getHeaders(headers: Headers) {
		headers.append("Content-Type","application/json");
		return headers;
	}
	
	private GetUrl(endpoint:string, params:any=null): string {
		var url = ServiceBase.ApiUrl + endpoint;
		var x = new UrlChainer(url);
		x.FromModel(params);
		return x.GetUrl();
	}
	
	public Post(endpoint: string, params:any=null, model:any=null) {
		var url = this.GetUrl(endpoint);
		return this.http
			.post(url,model,{ headers: this.getHeaders(new Headers()) })
			.map(this.extract);
	}
	
	private extract(res: Response) {
		let body = res.json();
		return body.data || { };
	}
}