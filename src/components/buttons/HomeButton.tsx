import React from 'react';
import {Icon} from 'react-native-elements';
import {blue} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface HomeButtonProps {
  onPress: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({onPress}) => {
  return (
    <Icon
      name="home"
      type="font-awesome-5"
      onPress={onPress}
      size={iSmall}
      color={blue}
    />
  );
};

export default HomeButton;
