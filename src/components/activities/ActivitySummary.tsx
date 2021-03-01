import React, {memo} from 'react';
import {ListItem} from 'react-native-elements';
import {Activity} from '../../model/Activity';

interface ActivitySummaryProps {
  activity: Activity;
}

const ActivitySummary = ({activity}: ActivitySummaryProps) => {
  return (
    <>
      <ListItem.Content>
        <ListItem.Title>{activity.activityName}</ListItem.Title>
        <ListItem.Subtitle>{activity.startDate}</ListItem.Subtitle>
      </ListItem.Content>
    </>
  );
};

export default memo(ActivitySummary);
