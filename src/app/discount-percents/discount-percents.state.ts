import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';

import {
  LoadPercents,
  ChangeDiscount,
  ChangeCashback,
  LoadOrgData
} from './discount-percents.actions';
import { CashbackPercent, OrgData } from './models';
import { DiscountDataService } from './discount-data.service';

export interface DiscountPercentsStateModel {
  percents: CashbackPercent[];
  loadingStates: { percents: boolean, org: boolean };
  isLoading: boolean;
  org?: OrgData;
  maxCashback?: number;
  maxDiscount?: number;
  discount?: number;
  cashback?: number;
}

@State<DiscountPercentsStateModel>({
  name: 'discountPercents',
  defaults: {
    percents: [],
    loadingStates: { percents: false, org: false },
    isLoading: false
  }
})
@Injectable()
export class DiscountPercentsState {

  constructor(private dataService: DiscountDataService) { }

  @Selector()
  public static percents(state: DiscountPercentsStateModel): CashbackPercent[] {
    return state.percents;
  }

  @Selector()
  public static minDiscount(state: DiscountPercentsStateModel): number | null {
    return state.org ? state.org.minDiscount : null;
  }

  @Selector()
  public static maxDiscount(state: DiscountPercentsStateModel): number | null {
    return state.maxDiscount;
  }

  @Selector()
  public static maxCashback(state: DiscountPercentsStateModel): number | null {
    return state.maxCashback;
  }

  @Selector()
  public static discount(state: DiscountPercentsStateModel): number | null {
    return state.discount;
  }

  @Selector()
  public static cashback(state: DiscountPercentsStateModel): number | null {
    return state.cashback;
  }

  @Selector()
  public static isLoading(state: DiscountPercentsStateModel): boolean {
    return state.isLoading;
  }

  @Action(LoadPercents)
  public loadPercents(ctx: StateContext<DiscountPercentsStateModel>) {
    this.toggleLoadingState(ctx, 'percents', true);
    return this.dataService.getCashbackPercents().pipe(
      map(percents => percents.sort((a, b) => a.discount - b.discount)),
      tap(percents => {
        const max = percents[percents.length - 1];
        ctx.patchState({ percents, maxDiscount: max.discount, maxCashback: max.cashback });
        this.toggleLoadingState(ctx, 'percents', false);
      })
    );
  }

  @Action(LoadOrgData)
  public loadOrgData(ctx: StateContext<DiscountPercentsStateModel>) {
    this.toggleLoadingState(ctx, 'org', true);
    return this.dataService.getOrgData().pipe(
      tap(org => {
        ctx.patchState({ org, discount: org.discount, cashback: org.cashback });
        this.toggleLoadingState(ctx, 'org', false);
      }),
      tap(() => console.log(ctx.getState()))
    );
  }

  @Action(ChangeDiscount)
  public changeDiscount(ctx: StateContext<DiscountPercentsStateModel>, { discount }: ChangeDiscount) {
    // TODO: implement code

    this.dataService.CashbackPercent.subscribe(
      percents => {
        const cashback = this.defineCashbackForDiscount(percents, discount);
        ctx.patchState({ discount: discount, cashback: cashback });
      }
    );
  }

  @Action(ChangeCashback)
  public changeCashback(ctx: StateContext<DiscountPercentsStateModel>, { cashback }: ChangeCashback) {
    // TODO: implement code

    this.dataService.CashbackPercent.subscribe(
      percents => {
        const discount = this.defineDiscountForCashback(percents, cashback);
        ctx.patchState({ cashback: cashback, discount: discount });
      }
    );
  }

  private toggleLoadingState(ctx: StateContext<DiscountPercentsStateModel>, name: string, value: boolean): void {
    const loadingStates = { ...ctx.getState().loadingStates, [name]: value };
    const isLoading = Object.values(loadingStates).reduce((sum, next) => sum || next);
    ctx.patchState({ loadingStates, isLoading });
  }

  private formatSum(sum: number) {
    return Number(sum.toFixed(1));
  }

  private defineDiscountForCashback(percents: CashbackPercent[], cashback: number) {
    const minDiscount = percents[0].discount;
    let discount = minDiscount;

    for (let i = 0; i < percents.length - 1; i++) {
      if (cashback > percents[i].cashback && cashback < percents[i + 1].cashback) {
        discount = percents[i + 1].discount;
      }
    }

    return discount;
  }

  private defineCashbackForDiscount(percents: CashbackPercent[], discount: number) {
    const max = percents[percents.length - 1];
    const min = percents[0];
    const percent = percents.find(x => this.formatSum(x.discount) == this.formatSum(discount));
    const cashback = percent ? 
      this.formatSum(percent.cashback) > this.formatSum(max.cashback) ? max.cashback : percent.cashback :
      min.cashback;

    return cashback;
  }
}
