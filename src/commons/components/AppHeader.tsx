import React from 'react';
import {Header} from 'react-native-elements';
import HomeHeaderComponent from './HomeHeaderComponent';

// TODO get icons from header
const AppHeader = () => {
  return (
    <Header
      leftComponent={<HomeHeaderComponent />}
      centerComponent={{
        text: 'XPENSES',
        style: {color: '#fff'},
      }}
      // rightComponent={<LogoutHeaderComponent />}
    />
  );
};

export default AppHeader;
