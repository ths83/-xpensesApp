export default class Expense {
  id: string;
  userId: string;
  amount: number;
  currency: string;

  constructor(id: string, userId: string, amount: number, currency: string) {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.currency = currency;
  }
}
