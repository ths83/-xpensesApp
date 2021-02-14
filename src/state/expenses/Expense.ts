import {atom} from 'jotai';
import {EMPTY_EXPENSE, Expense} from '../../model/Expense';

const expenseAtom = atom<Expense>(EMPTY_EXPENSE);

export default expenseAtom;
