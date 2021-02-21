export type Expense = {
  id: string;
  user: string;
  amount: number;
  currency: string;
  date: string;
  expenseName: string;
};

export const EMPTY_EXPENSE = {
  id: '',
  user: '',
  amount: 0,
  currency: '',
  date: '',
  expenseName: '',
};
