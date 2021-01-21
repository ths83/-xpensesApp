import {toYYYY_MM_DD} from '../utils/DateFormatter';

export default class Activity {
  id: string;
  name: string;
  createdBy: string;
  expenses: string[];
  users: string[];
  date: string;

  constructor(
    id: string,
    name: string,
    createdBy: string,
    expenses: string[],
    users: string[],
    date: string,
  ) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.expenses = expenses;
    this.users = users;
    this.date = toYYYY_MM_DD(date);
  }
}
