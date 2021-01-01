import React from 'react';
import {ListItem} from 'react-native-elements';
import Activity from '../../../model/Activity';

interface ActivityDetailsInterface {
  activity: Activity;
}

const ActivityDetails = ({activity}: ActivityDetailsInterface) => {
  return (
    <ListItem.Content>
      <ListItem.Title>{activity.name}</ListItem.Title>
      <ListItem.Subtitle>
        {activity.date === undefined ? 'No date found' : activity.date}
      </ListItem.Subtitle>
    </ListItem.Content>
  );
};

export default ActivityDetails;
