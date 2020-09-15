import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountPercentsComponent } from './discount-percents/discount-percents.component';

const routes: Routes = [
  { path: '', component: DiscountPercentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
