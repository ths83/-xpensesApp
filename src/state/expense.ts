import {atom} from 'jotai';
import {Expense, EMPTY_EXPENSE} from '../model/Expense';

const expenseAtom = atom<Expense>(EMPTY_EXPENSE);

export default expenseAtom;
