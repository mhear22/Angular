import { Injector, Injectable  } from '@angular/core';
import { Http } from '@angular/http';
import { ServiceBase } from './ServiceBase';

@Injectable()
export class ImageService extends ServiceBase {
	constructor(http:Http) {
		super(http);
	}
	public GetImageUrl(Id:string): string{
		return ServiceBase.ApiUrl + "i/" + Id;
	}
}