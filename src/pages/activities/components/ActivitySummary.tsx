import React from 'react';
import {ListItem} from 'react-native-elements';
import Activity from '../../../model/Activity';

interface Props {
  activity: Activity;
}

const ActivitySummary = ({activity}: Props) => {
  return (
    <ListItem.Content>
      <ListItem.Title>{activity.name}</ListItem.Title>
      <ListItem.Subtitle>
        {activity.date === undefined ? 'No date found' : activity.date}
      </ListItem.Subtitle>
    </ListItem.Content>
  );
};

export default ActivitySummary;