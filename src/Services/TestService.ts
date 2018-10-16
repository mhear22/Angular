import { Injectable } from "@angular/core";
import { UrlChainer } from "./UrlChainer"; 

@Injectable()
export class TestService {
	public method() {
		return new UrlChainer("").GetUrl();
	}
}