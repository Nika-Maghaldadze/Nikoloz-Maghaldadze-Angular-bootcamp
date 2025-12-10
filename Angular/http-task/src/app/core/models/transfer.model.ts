import { Account, SelectableAccount } from "./account.model";

export interface TransferFormValue {
  fromAccountId: number | null;
  toAccountId: number | null;
  fromAmount: number | null;
  toAmount: number | null;
}

export interface TransferViewModel {
  senderAccounts: Account[];
  receiverAccounts: SelectableAccount[];
  fromAccount: Account | null;
  toAccount: Account | null;
  fxRate: number | null;
  canConvert: boolean;
  balanceExceeded: boolean;
}