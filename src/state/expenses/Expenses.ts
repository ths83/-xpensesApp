import {atom} from 'jotai';
import {Expense} from '../../model/Expense';

type Expenses = {
  all: Expense[];
  currentUser: Expense[];
  otherUser: Expense[];
};

const emptyExpenses = {
  all: [],
  currentUser: [],
  otherUser: [],
} as Expenses;

const expensesAtom = atom(emptyExpenses);

export default expensesAtom;

export const buildExpenses = (expenses: Expense[], username: string) => {
  return {
    all: expenses,
    currentUser: expenses.filter((expense) => expense.user === username),
    otherUser: expenses.filter((expense) => expense.user !== username),
  };
};
