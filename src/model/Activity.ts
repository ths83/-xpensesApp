export type Activity = {
  id: string;
  activityName: string;
  createdBy: string;
  expenses: string[];
  users: string[];
  startDate: string;
  activityStatus: string;
};

export const EMPTY_ACTIVITY = {
  id: '',
  activityName: '',
  createdBy: '',
  expenses: [],
  users: [],
  startDate: '',
  activityStatus: '',
};
