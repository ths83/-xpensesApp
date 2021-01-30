import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Icon} from 'react-native-elements';

const HomeHeaderComponent = () => {
  const {navigate} = useNavigation();

  return (
    <Icon
      name="home"
      onPress={() => {
        navigate('Activities');
      }}
    />
  );
};

export default HomeHeaderComponent;
