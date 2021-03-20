import React from 'react';
import {Icon} from 'react-native-elements';
import {blue} from '../../themes/colors';
import {iMedium} from '../../themes/icons';

interface LogoutButtonProps {
  onPress: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({onPress}) => {
  return (
    <Icon
      name="sign-out-alt"
      type="font-awesome-5"
      onPress={onPress}
      size={iMedium}
      color={blue}
    />
  );
};

export default LogoutButton;
