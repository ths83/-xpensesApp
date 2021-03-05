import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {Pages} from '../../enums/Pages';
import {Status} from '../../enums/Status';
import activityAtom from '../../state/Activity';
import {blue, grey} from '../../themes/colors';
import {slarge} from '../../themes/size';

const AddActivityPage = () => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
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
          navigate(Pages.EXPENSES);
        })
        .catch(() => setStatus(Status.ERROR));
    } else {
      setStatus(Status.IDLE);
    }
  };

  return (
    <>
      <View style={styles.activityInput}>
        <Input
          placeholder="Activity name"
          onChangeText={(text) => setName(text)}
          errorMessage={errorName}
        />
      </View>
      <Text>
        {status === Status.ERROR &&
          'An error occurred while adding new activity'}
      </Text>
      <View>
        <Button
          title={'Create'}
          onPress={createActivity}
          buttonStyle={styles.create}
        />
        <Button title={'Back'} onPress={goBack} buttonStyle={styles.back} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  activityInput: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  create: {
    backgroundColor: blue,
  },
  back: {
    backgroundColor: grey,
    paddingBottom: slarge,
  },
});

export default AddActivityPage;
