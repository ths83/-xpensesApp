import {API} from 'aws-amplify';
import {API_NAME} from '../config/AmplifyConfiguration';

export async function createActivity(name: string, createdBy: string) {
  const apiName = API_NAME;
  const path = '/activities';
  const myInit = {
    headers: {},
    body: {
      name: name,
      createdBy: createdBy,
    },
  };
  console.log('Creating new activity...');
  return await API.post(apiName, path, myInit);
}

export async function getActivityByUsername(username: string) {
  const apiName = API_NAME;
  const path = '/activities?username=' + username;
  const myInit = {
    headers: {},
  };
  console.log('Retrieving activity by username...');
  return await API.get(apiName, path, myInit);
}

export async function getActivityById(id: string) {
  const apiName = API_NAME;
  const path = '/activities/' + id;
  const myInit = {
    headers: {},
  };
  console.log('Retrieving activity by id...');
  return await API.get(apiName, path, myInit);
}
