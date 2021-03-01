export type Expense = {
  id: string;
  user: string;
  amount: number;
  currency: string;
  startDate: string;
  expenseName: string;
};

export const EMPTY_EXPENSE = {
  id: '',
  user: '',
  amount: 0,
  currency: '',
  startDate: '',
  expenseName: '',
};
