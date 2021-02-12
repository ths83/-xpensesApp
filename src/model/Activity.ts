export type Activity = {
  id: string;
  name: string;
  createdBy: string;
  expenses: string[];
  users: string[];
  date: string;
};

export const EMPTY_ACTIVITY = {
  id: '',
  name: '',
  createdBy: '',
  expenses: [],
  users: [],
  date: '',
};
