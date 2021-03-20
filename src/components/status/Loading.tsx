import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {blue} from '../../themes/colors';

const Loading: React.FC = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={blue} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default memo(Loading);
