import Expense from '../../model/Expense';

export function sortByLastDate(expenses: Expense[]) {
  return expenses
    .sort((ex1, ex2) => {
      if (ex1.date > ex2.date) {
        return 1;
      }
      if (ex1.date < ex2.date) {
        return -1;
      }
      return 0;
    })
    .reverse();
}
