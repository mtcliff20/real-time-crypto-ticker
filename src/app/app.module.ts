import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptoTickerComponent } from './crypto-ticker/crypto-ticker/crypto-ticker.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoTickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
