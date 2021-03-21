import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import HomeButton from '../buttons/HomeButton';

const HomeHeaderComponent = () => {
  const {popToTop} = useNavigation();

  return <HomeButton onPress={popToTop} />;
};

export default memo(HomeHeaderComponent);
