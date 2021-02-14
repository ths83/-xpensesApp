import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {Pages} from '../../enums/Pages';
import {Status} from '../../enums/Status';
import activityAtom from '../../state/Activity';

const AddActivityPage = () => {
  const [name, setName] = useState<string>('');
  const [errorName, setErrorName] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const [, setActivity] = useAtom(activityAtom);
  const {goBack, navigate} = useNavigation();

  function isValidName() {
    if (name === '') {
      setErrorName('Name is required');
      return false;
    } else {
      setErrorName('');
      return true;
    }
  }

  const createActivity = () => {
    if (isValidName()) {
      setStatus(Status.IN_PROGRESS);
      ACTIVITY_API.create(name)
        .then((activity) => {
          setStatus(Status.SUCCESS);
          setActivity(activity);
          navigate(Pages.ACTIVITY_DETAILS);
        })
        .catch(() => setStatus(Status.ERROR));
    } else {
      setStatus(Status.IDLE);
    }
  };

  return (
    <>
      <View>
        <Input
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          errorMessage={errorName}
        />
      </View>
      <Text>
        {status === Status.ERROR &&
          'An error occurred while adding new activity'}
      </Text>
      <Button title={'Create'} onPress={createActivity} />
      <Button title={'Back'} onPress={goBack} />
    </>
  );
};

export default AddActivityPage;
