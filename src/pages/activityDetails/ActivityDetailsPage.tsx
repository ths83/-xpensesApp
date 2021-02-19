import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {Button, View} from 'react-native';
import {Text} from 'react-native-elements';
import activityAtom from '../../state/Activity';

const ActivityDetailsPage = () => {
  const [activity] = useAtom(activityAtom);

  const {navigate, goBack} = useNavigation();

  return (
    <>
      <View>
        <Text h3>{activity.name}</Text>
      </View>
      <View>
        <Button title={'Back'} onPress={goBack} />
      </View>
    </>
  );
};

export default ActivityDetailsPage;
