export default class Activity {

    id: string;
    name: string;
    createdBy: string;
    expenses: [];
    activityStatus: string;
    userStatus: [];

    constructor(id: string, name: string, createdBy: string, expenses: [], activityStatus: string, userStatus: []) {
        this.id = id;
        this.name = name;
        this.createdBy = createdBy;
        this.expenses = expenses;
        this.activityStatus = activityStatus;
        this.userStatus = userStatus;
    }
}
