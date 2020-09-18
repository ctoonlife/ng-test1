import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import {
  LoadPercents,
  LoadOrgData,
  ChangeDiscount,
  ChangeCashback
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
    combineLatest([this.minDiscount$, this.maxDiscount$, this.discount$]).pipe(first()).subscribe(([min, max, current]) => {
      let result: number;
      if (event.value < min) {
        result = min;
      } else if (event.value > max) {
        result = max;
      } else {
        result = event.value;
      }
      event.source.value = result;
      if (result !== current) {
        this.store.dispatch(new ChangeDiscount(result));
      }
    });
  }

  changeCashback(event: MatSliderChange): void {
    combineLatest([this.maxCashback$, this.cashback$]).pipe(first()).subscribe(([max, current]) => {
      let result: number;
      if (event.value < this.minCashback) {
        result = this.minCashback;
      } else if (event.value > max) {
        result = max;
      } else {
        result = event.value;
      }
      event.source.value = result;
      if (result !== current) {
        this.store.dispatch(new ChangeCashback(result));
      }
    });
  }

  formatCashbackLabel(value: number) {
    return value.toFixed(1);
  }
}
