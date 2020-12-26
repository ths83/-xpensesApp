import React from 'react';
import {Header} from 'react-native-elements';

export default class ActivityDetailsHeader extends React.Component<{
  activityName: string;
}> {
  // FIXME get icons from header
  render() {
    return (
      <Header
        // leftComponent={getHomeHeader()}
        centerComponent={{
          text: this.props.activityName,
          style: {color: '#fff'},
        }}
        // rightComponent={{icon: 'alert-circle-outline', color: '#fff'}}
      />
    );
  }
}
