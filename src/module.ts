import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from './Services/Login';
import { AppComponent }  from './app';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
 