import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

const HomeHeaderComponent = () => {
  const {navigate} = useNavigation();

  return <Icon name={'alert-circle'} onPress={() => navigate('Activities')} />;
};

export default HomeHeaderComponent;
