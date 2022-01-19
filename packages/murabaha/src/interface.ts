export interface IMurabahaBroker {
  purchaseCommodities(
    req: PurchaseCommoditiesReq
  ): Promise<PurchaseCommoditiesRes>;
}

export type Amount = {
  currencyCode: string;
  amount: number;
};

export type PurchaseCommoditiesReq = {
  idempotencyKey: string;
  amount: Amount;
};

export type PurchaseCommoditiesRes = {
  success: boolean;
};
