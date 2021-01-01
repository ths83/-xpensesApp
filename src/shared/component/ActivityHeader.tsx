import React from 'react';
import {Header} from 'react-native-elements';

interface ActivityHeaderInterface {
  title: string;
}

const ActivityHeader = ({title}: ActivityHeaderInterface) => {
  // FIXME get icons from header
  return (
    <Header
      // leftComponent={getHomeHeader()}
      centerComponent={{
        text: title,
        style: {color: '#fff'},
      }}
      // rightComponent={{icon: 'alert-circle-outline', color: '#fff'}}
    />
  );
};

export default ActivityHeader;
