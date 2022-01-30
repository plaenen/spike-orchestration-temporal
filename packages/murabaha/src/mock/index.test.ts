import { addBusinessDays, subBusinessDays } from 'date-fns'
import { createMurabahaMockService } from './index';

it('should  be possible to have a mock server', async () => {
  const service = createMurabahaMockService();
  const res = await service.purchaseCommodities({
    amount: {
      amount: 1000,
      currency: 'EUR',
      decimals: 0
    },
    idempotencyKey: 'f590f803-ff6a-435b-9800-31db2f337b66'
  });
  expect(res.transactionId).not.toBeUndefined();
});

it('should be possible to get a murabaha purchase date based on the completion date', async () => {
  const service = createMurabahaMockService();
  const completionDate = addBusinessDays(new Date(), 10)
  const res = await service.deriveMurabahaPuchaseDate({
    completionDate,
  })
  expect(res.murabahaPurchaseDate).toEqual(subBusinessDays(completionDate, 2));
});

export {};
