import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { NgxsModule } from '@ngxs/store';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DiscountDataService } from './discount-percents/discount-data.service';
import { DiscountPercentsComponent } from './discount-percents/discount-percents.component';
import { DiscountPercentsState } from './discount-percents/discount-percents.state';

@NgModule({
  declarations: [
    AppComponent,
    DiscountPercentsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    NgxsModule.forRoot([
      DiscountPercentsState
    ], {
      developmentMode: !environment.production
    })
  ],
  providers: [
    DiscountDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
