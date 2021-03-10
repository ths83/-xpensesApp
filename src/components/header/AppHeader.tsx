import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import {blue} from '../../themes/colors';
import {sNormal} from '../../themes/size';
import HomeHeaderComponent from './HomeHeaderComponent';
import LogoutHeaderComponent from './LogoutHeaderComponent';

const AppHeader = () => {
  return (
    <Header
      containerStyle={styles.header}
      leftComponent={<HomeHeaderComponent />}
      rightComponent={<LogoutHeaderComponent />}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: blue,
    paddingLeft: sNormal,
    paddingRight: sNormal,
  },
});
export default memo(AppHeader);
