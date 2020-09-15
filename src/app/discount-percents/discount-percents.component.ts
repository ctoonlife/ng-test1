import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

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
        this.minDiscount = this.store.selectSnapshot<number>(state => state.discountPercents.org.minDiscount);
        this.maxDiscount = this.store.selectSnapshot<number>(state => state.discountPercents.maxDiscount);
        this.maxCashback = this.store.selectSnapshot<number>(state => state.discountPercents.maxCashback);
      }
    });
  }

  changeDiscount(event: MatSliderChange): void {
    // TODO: implement code

    if (event.value < this.minDiscount) {
      event.source.value = this.minDiscount
    }

    if (event.value > this.maxDiscount) {
      event.source.value = this.maxDiscount
    }

    this.store.dispatch([new ChangeDiscount(event.source.value)]);
  }

  changeCashback(event: MatSliderChange): void {
    // TODO: implement code

    if (event.value < this.minCashback) {
      event.source.value = this.minCashback
    }

    if (event.value > this.maxCashback) {
      event.source.value = this.maxCashback
    }

    this.store.dispatch([new ChangeCashback(event.source.value)]);
  }

  formatCashbackLabel(value: number) {
    return value.toFixed(1);
  }
}
