export default class Expense {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  date: string;
  name: string;

  constructor(
    id: string,
    userId: string,
    amount: number,
    currency: string,
    date: string,
    name: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.currency = currency;
    this.date = date;
    this.name = name;
  }
}
