import {toYYYY_MM_DD} from '../utils/DateFormatter';

export default class Expense {
  id: string;
  user: string;
  amount: number;
  currency: string;
  date: string;
  name: string;

  constructor(
    id: string,
    user: string,
    amount: number,
    currency: string,
    date: string,
    name: string,
  ) {
    this.id = id;
    this.user = user;
    this.amount = amount;
    this.currency = currency;
    this.date = toYYYY_MM_DD(date);
    this.name = name;
  }
}
