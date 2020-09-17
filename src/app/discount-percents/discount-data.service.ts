import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, shareReplay } from 'rxjs/operators';

import { CashbackPercent, OrgData } from './models';

@Injectable()
export class DiscountDataService {

  private cache$: Observable<CashbackPercent[]>;

  public get CashbackPercent() {
    return this.cache$;
  }

  constructor(private http: HttpClient) {
    this.cache$ = this.getCashbackPercents().pipe(
      shareReplay(1)
    );
  }

  getCashbackPercents(): Observable<CashbackPercent[]> {
    return this.getAssetData<CashbackPercent[]>('cashback-percents').pipe(
      delay(1000)
    );
  }

  getOrgData(): Observable<OrgData> {
    return this.getAssetData<OrgData>('org').pipe(
      delay(500)
    );
  }

  private getAssetData<T>(name: string): Observable<T> {
    return this.http.get(`./assets/${name}.json`) as Observable<T>;
  }
}
