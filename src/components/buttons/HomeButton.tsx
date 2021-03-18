import React from 'react';
import {Icon} from 'react-native-elements';
import {white} from '../../themes/colors';
import {iMedium} from '../../themes/icons';

interface HomeButtonProps {
  onPress: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({onPress}) => {
  return (
    <Icon
      name="home"
      type="font-awesome-5"
      onPress={onPress}
      size={iMedium}
      color={white}
    />
  );
};

export default HomeButton;
