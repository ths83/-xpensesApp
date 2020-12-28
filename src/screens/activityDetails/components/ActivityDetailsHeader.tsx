import React from 'react';
import {Header} from 'react-native-elements';

export default class ActivityDetailsHeader extends React.Component<{
  title: string;
}> {
  // FIXME get icons from header
  render() {
    return (
      <Header
        // leftComponent={getHomeHeader()}
        centerComponent={{
          text: this.props.title,
          style: {color: '#fff'},
        }}
        // rightComponent={{icon: 'alert-circle-outline', color: '#fff'}}
      />
    );
  }
}
