import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {activityAtom} from '../../../App';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {Status} from '../../commons/enums/Status';

const AddActivityPage = () => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const [, setActivity] = useAtom(activityAtom);

  const {navigate} = useNavigation();

  return (
    <>
      <View>
        <Input placeholder="Name" onChangeText={(text) => setName(text)} />
      </View>
      <Text>
        {status === Status.ERROR &&
          'An error occurred while adding new activity'}
      </Text>
      <Button
        title={'Create'}
        onPress={() => {
          ACTIVITY_API.create(name)
            .then((response) => {
              console.log(`Successfully added activity '${response.id}'`);
              setStatus(Status.SUCCESS);
              setActivity(response);
              navigate('ActivityDetails');
            })
            .catch((error) => {
              console.log(error);
              setStatus(Status.ERROR);
            });
        }}
      />
    </>
  );
};

export default AddActivityPage;
