import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native-elements';

const HomeHeaderComponent = () => {
  const {navigate} = useNavigation();

  return (
    <Button
      onPress={() => {
        navigate('Activities');
      }}
    />
  );
};

export default HomeHeaderComponent;
