export default class Activity {
  id: string;
  name: string;
  createdBy: string;
  expenses: string[];
  activityStatus: string;
  userStatus: [];
  date: string;

  constructor(
    id: string,
    name: string,
    createdBy: string,
    expenses: string[],
    activityStatus: string,
    userStatus: [],
    date: string,
  ) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.expenses = expenses;
    this.activityStatus = activityStatus;
    this.userStatus = userStatus;
    this.date = date;
  }
}
