import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {Pages} from '../../enums/Pages';

const HomeHeaderComponent = () => {
  const {navigate} = useNavigation();

  return (
    <Icon
      name="home"
      onPress={() => {
        navigate(Pages.ACTIVITIES);
      }}
    />
  );
};

export default HomeHeaderComponent;
