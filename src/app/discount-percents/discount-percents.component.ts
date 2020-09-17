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

  private minDiscount: number;
  private maxDiscount: number;
  private maxCashback: number;

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
    this.isLoading$.subscribe(isLoading => {
      if(!isLoading) {
        combineLatest([this.minDiscount$, this.maxDiscount$, this.maxCashback$]).
        pipe(first()).
        subscribe(([minDiscount, maxDiscount, maxCashback]) => {
          this.minDiscount = minDiscount;
          this.maxDiscount = maxDiscount;
          this.maxCashback = maxCashback;
        });
      }
    });
  }

  changeDiscount(event: MatSliderChange): void {
    // TODO: implement code

    if (event.value < this.minDiscount) {
      event.source.value = this.minDiscount;

      // пересчитать, если минимальное значение достигнуто, но состояние не обновлялось
      if (this.store.selectSnapshot<number>(state => state.discountPercents.discount) > event.source.value) {
        this.store.dispatch([new ChangeDiscount(event.source.value)]);
      }
    } else if (event.value > this.maxDiscount) {
      event.source.value = this.maxDiscount;

      // пересчитать, если максимальное значение достигнуто, но состояние не обновлялось
      if (this.store.selectSnapshot<number>(state => state.discountPercents.discount) < event.source.value) {
        this.store.dispatch([new ChangeDiscount(event.source.value)]);
      }
    } else {
      this.store.dispatch([new ChangeDiscount(event.source.value)]);
    }
    
  }

  changeCashback(event: MatSliderChange): void {
    // TODO: implement code

    if (event.value < this.minCashback) {
      event.source.value = this.minCashback;

      // пересчитать, если минимальное значение достигнуто, но состояние не обновлялось
      if (this.store.selectSnapshot<number>(state => state.discountPercents.cashback) > event.source.value) {
        this.store.dispatch([new ChangeCashback(event.source.value)]);
      }
    } else if (event.value > this.maxCashback) {
      event.source.value = this.maxCashback;

      // пересчитать, если максимальное значение достигнуто, но состояние не обновлялось
      if (this.store.selectSnapshot<number>(state => state.discountPercents.cashback) < event.source.value) {
        this.store.dispatch([new ChangeCashback(event.source.value)]);
      }
    } else {
      this.store.dispatch([new ChangeCashback(event.source.value)]);
    }
  }

  formatCashbackLabel(value: number) {
    return value.toFixed(1);
  }
}
