export type Currency = 'GEL' | 'USD' | 'EUR';

export interface Account {
  id: number;
  iban: string;
  ownerName: string;
  currency: Currency;
  balance: number;
  isSender: boolean;
}

export interface SelectableAccount extends Account {
  disabledForReceiver: boolean;
  disabledBecauseSameAccount: boolean;
  tooltip: string | null;
}
