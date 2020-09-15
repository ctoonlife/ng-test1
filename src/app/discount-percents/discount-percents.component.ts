import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import {
  LoadPercents,
  LoadOrgData
} from './discount-percents.actions';
import { DiscountPercentsState } from './discount-percents.state';
import { CashbackPercent } from './models';


@Component({
  selector: 'app-discount-percents',
  templateUrl: './discount-percents.component.html',
  styleUrls: ['./discount-percents.component.scss']
})
export class DiscountPercentsComponent implements OnInit {

  public readonly minCashback = 1;

  @Select(DiscountPercentsState.isLoading)
  isLoading$: Observable<boolean>;

  @Select(DiscountPercentsState.percents)
  percents$: Observable<CashbackPercent[]>;

  @Select(DiscountPercentsState.minDiscount)
  minDiscount$: Observable<number>;

  @Select(DiscountPercentsState.maxDiscount)
  maxDiscount$: Observable<number>;

  @Select(DiscountPercentsState.maxCashback)
  maxCashback$: Observable<number>;

  @Select(DiscountPercentsState.discount)
  discount$: Observable<number>;

  @Select(DiscountPercentsState.cashback)
  cashback$: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch([new LoadPercents(), new LoadOrgData()]);
  }

  changeDiscount(event: MatSliderChange): void {
    // TODO: implement code
  }

  changeCashback(event: MatSliderChange): void {
    // TODO: implement code
  }

  formatCashbackLabel(value: number) {
    return value.toFixed(1);
  }
}
