import { Injector, Injectable  } from '@angular/core';
import { Http } from '@angular/http';
import { ServiceBase } from './ServiceBase';

@Injectable()
export class ImageService extends ServiceBase {
	public GetImageUrl(Id:string): string{
		return ServiceBase.ApiUrl + "i/" + Id;
	}
}