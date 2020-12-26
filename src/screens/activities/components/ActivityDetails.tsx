import React from 'react';
import {ListItem} from 'react-native-elements';
import Activity from '../../../model/Activity';

export default class ActivityDetails extends React.Component<{
  activity: Activity;
}> {
  render() {
    return (
      <ListItem.Content>
        <ListItem.Title>{this.props.activity.name}</ListItem.Title>
        <ListItem.Subtitle>
          {this.props.activity.date === undefined
            ? 'No date found'
            : this.props.activity.date}
        </ListItem.Subtitle>
      </ListItem.Content>
    );
  }
}
