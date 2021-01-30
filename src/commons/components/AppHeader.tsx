import React from 'react';
import {Header} from 'react-native-elements';
import HomeHeaderComponent from './HomeHeaderComponent';
import LogoutHeaderComponent from './LogoutHeaderComponent';

const AppHeader = () => {
  return (
    <Header
      leftComponent={<HomeHeaderComponent />}
      centerComponent={{
        text: 'XPENSES',
        style: {color: '#fff'},
      }}
      rightComponent={<LogoutHeaderComponent />}
    />
  );
};

export default AppHeader;
