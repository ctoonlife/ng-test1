export class LoadPercents {
  public static readonly type = '[DiscountPercents] LoadPercents';
}

export class LoadOrgData {
  public static readonly type = '[DiscountPercents] LoadOrgData';
}

export class ChangeDiscount {
  public static readonly type = '[DiscountPercents] ChangeDiscount';
  constructor(public discount: number) { }
}

export class ChangeCashback {
  public static readonly type = '[DiscountPercents] ChangeCashback';
  constructor(public cashback: number) { }
}
