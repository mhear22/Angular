import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './rxjs-operators';
import { AppModule } from './module';

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err :any) => alert(err));