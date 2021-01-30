import React from 'react';
import {ListItem} from 'react-native-elements';
import Activity from '../../../model/Activity';

interface ActivitySummaryProps {
  activity: Activity;
}

const ActivitySummary = ({activity}: ActivitySummaryProps) => {
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
