export type Expense = {
  id: string;
  user: string;
  amount: string;
  currency: string;
  startDate: string;
  expenseName: string;
};

export const EMPTY_EXPENSE = {
  id: '',
  user: '',
  amount: '',
  currency: '',
  startDate: '',
  expenseName: '',
} as Expense;
