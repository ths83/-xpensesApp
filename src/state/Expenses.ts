import {atom} from 'jotai';
import {Expense} from '../model/Expense';

const expensesAtom = atom<Expense[]>([]);

export default expensesAtom;
