import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Header, Text} from 'react-native-elements';
import {blue, white} from '../../themes/colors';
import {sNormal} from '../../themes/size';
import HomeHeaderComponent from './HomeHeaderComponent';
import LogoutHeaderComponent from './LogoutHeaderComponent';

const AppHeader = () => {
  return (
    <Header
      containerStyle={styles.header}
      leftComponent={<HomeHeaderComponent />}
      centerComponent={<Text style={styles.title}>XPENSES</Text>}
      rightComponent={<LogoutHeaderComponent />}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: blue,
  },
  title: {
    color: white,
    fontSize: sNormal,
  },
});
export default memo(AppHeader);
