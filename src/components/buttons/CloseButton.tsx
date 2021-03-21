import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {blue} from '../../themes/colors';
import {sMedium} from '../../themes/size';

interface CloseButtonProps {
  onPress: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({onPress}) => {
  return <Button title="Pay" onPress={onPress} buttonStyle={styles.blue} />;
};

const styles = StyleSheet.create({
  blue: {
    margin: sMedium,
    paddingLeft: sMedium,
    paddingRight: sMedium,
    backgroundColor: blue,
  },
});

export default CloseButton;
