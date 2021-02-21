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
        <ListItem.Title>
          {/* name is a restricted field from AWS dynamoDB
           has been changed later in the api by activityName
           migration is not completed for every activity
           */}
          {activity.activityName === undefined
            ? activity.name
            : activity.activityName}
        </ListItem.Title>
        <ListItem.Subtitle>
          {activity.date === undefined ? 'No date found' : activity.date}
        </ListItem.Subtitle>
      </ListItem.Content>
    </>
  );
};

export default memo(ActivitySummary);
