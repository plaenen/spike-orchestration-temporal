import { IMurabahaBroker, PurchaseCommoditiesReq, PurchaseCommoditiesRes } from '@packages/murabaha';

export interface Services {
  murabahaBroker: IMurabahaBroker;
}

export const createMurabahaActivities = (services: Services) => ({
  async purchaseCommodities(req: PurchaseCommoditiesReq): Promise<PurchaseCommoditiesRes> {
    let res = await services.murabahaBroker.purchaseCommodities(req);
    return res;
  }
});
