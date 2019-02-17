import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { ServiceBase } from "./ServiceBase";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	constructor(private router:Router) { }
	
	intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		var authReq = req.clone({
			headers:req.headers.set("apikey", ServiceBase.ApiKey).set('timezone',(-(new Date().getTimezoneOffset()/60)).toString())
		});
		return next.handle(authReq).pipe(catchError((err:HttpErrorResponse) => {
			if(err.status == 401)
				this.router.navigate(['/login']);
			return throwError(err);
		}));
	}
}