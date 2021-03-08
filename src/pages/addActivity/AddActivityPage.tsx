import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import BackButton from '../../components/buttons/BackButton';
import ValidateButton from '../../components/buttons/ValidateButton';
import {Pages} from '../../enums/Pages';
import {Status} from '../../enums/Status';
import activityAtom from '../../state/Activity';
import {sMedium} from '../../themes/size';

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
        <View style={styles.buttonsContainer}>
          <BackButton onPress={goBack} />
          <ValidateButton onPress={createActivity} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  activityInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: sMedium,
  },
  buttonsContainer: {
    margin: sMedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddActivityPage;
