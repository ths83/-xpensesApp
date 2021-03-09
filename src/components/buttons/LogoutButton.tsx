import React from 'react';
import {Icon} from 'react-native-elements';
import {white} from '../../themes/colors';
import {iMedium} from '../../themes/icons';

interface LogoutButtonProps {
  onPress: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({onPress}) => {
  return (
    <Icon
      name="sign-out"
      type="font-awesome"
      onPress={onPress}
      size={iMedium}
      color={white}
    />
  );
};

export default LogoutButton;
