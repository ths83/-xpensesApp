import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {black, red} from '../../themes/colors';
import {iLarge} from '../../themes/icons';
import {sMedium, sNormal} from '../../themes/size';

interface ErrorProps {
  text: string;
}

const Error: React.FC<ErrorProps> = ({text}) => (
  <View style={styles.container}>
    <Icon
      name="exclamation-circle"
      type="font-awesome-5"
      size={iLarge}
      color={red}
    />
    <Text style={styles.center}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    margin: sMedium,
    marginTop: sNormal,
    textAlign: 'center',
    color: black,
  },
});

export default memo(Error);
