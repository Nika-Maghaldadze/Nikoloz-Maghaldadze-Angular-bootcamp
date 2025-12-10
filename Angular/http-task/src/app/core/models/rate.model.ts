import { Currency } from './account.model';

export interface Rate {
  id: number;
  from: Currency;
  to: Currency;
  rate: number;
}
