export type Activity = {
  id: string;
  activityName: string;
  createdBy: string;
  expenses: string[];
  users: string[];
  date: string;
};

export const EMPTY_ACTIVITY = {
  id: '',
  activityName: '',
  createdBy: '',
  expenses: [],
  users: [],
  date: '',
};
