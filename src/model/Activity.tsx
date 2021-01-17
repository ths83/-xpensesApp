import {toYYYY_MM_DD} from '../shared/utils/DateFormatter';

export default class Activity {
  id: string;
  name: string;
  createdBy: string;
  expenses: string[];
  activityStatus: string;
  usersStatus: string[];
  date: string;

  constructor(
    id: string,
    name: string,
    createdBy: string,
    expenses: string[],
    activityStatus: string,
    usersStatus: string[],
    date: string,
  ) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.expenses = expenses;
    this.activityStatus = activityStatus;
    this.usersStatus = usersStatus;
    this.date = toYYYY_MM_DD(date);
  }
}
