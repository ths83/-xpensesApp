export type Expense = {
  id: string;
  user: string;
  amount: number;
  currency: string;
  date: string;
  name: string;
};

export const EMPTY_EXPENSE = {
  id: '',
  user: '',
  amount: 0,
  currency: '',
  date: '',
  name: '',
};
