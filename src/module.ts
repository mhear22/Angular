import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from "./Parts/app";
import { LoginService } from "./Services/LoginService";
import { Ng2Webstorage } from "ngx-webstorage";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		MatDialogModule,
		Ng2Webstorage
	],
	bootstrap: [AppComponent],
	entryComponents: [
		AppComponent,
	],
	providers: [
		//LoginService
	],
})
export class AppModule { }