import {atom} from 'jotai';
import {Activity, EMPTY_ACTIVITY} from '../model/Activity';

const activityAtom = atom<Activity>(EMPTY_ACTIVITY);

export default activityAtom;
