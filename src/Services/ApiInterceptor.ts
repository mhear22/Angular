import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServiceBase } from "./ServiceBase";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		var authReq = req.clone({
			headers:req.headers.set("apikey", ServiceBase.ApiKey)
		});
		return next.handle(authReq);
	}
}