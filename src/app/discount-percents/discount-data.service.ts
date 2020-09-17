import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CashbackPercent, OrgData } from './models';

@Injectable()
export class DiscountDataService {

  constructor(private http: HttpClient) {}

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
