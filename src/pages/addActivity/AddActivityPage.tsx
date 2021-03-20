import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ACTIVITY_API} from '../../api/ActivityApi';
import CancelButton from '../../components/buttons/CancelButton';
import ValidateButton from '../../components/buttons/ValidateButton';
import Error from '../../components/status/Error';
import Input from '../../components/input/CustomInput';
import Loading from '../../components/status/Loading';
import {Pages} from '../../enums/Pages';
import {Status} from '../../enums/Status';
import activityAtom from '../../state/Activity';
import {sMedium} from '../../themes/size';

const AddActivityPage = () => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const [, setActivity] = useAtom(activityAtom);
  const {popToTop, navigate} = useNavigation();

  const createActivity = () => {
    setStatus(Status.IN_PROGRESS);
    ACTIVITY_API.create(name)
      .then((activity) => {
        setStatus(Status.SUCCESS);
        setActivity(activity);
        navigate(Pages.EXPENSES);
      })
      .catch(() => setStatus(Status.ERROR));
  };

  const handleErrorName = () => {
    if (name === '') {
      setErrorName('Activity name is required');
    } else {
      setErrorName('');
    }
  };

  const render = () => {
    if (status === Status.IN_PROGRESS) {
      return <Loading />;
    } else if (status === Status.ERROR) {
      return <Error text="An error occurred while fetching activities" />;
    } else {
      return (
        <>
          <View style={styles.activityInput}>
            <Input
              leftIcon={{type: 'font-awesome-5', name: 'heading'}}
              placeholder="Activity name"
              onChangeText={(text) => {
                setName(text);
                handleErrorName();
              }}
              errorMessage={errorName}
            />
          </View>

          <View>
            <View style={styles.buttonsContainer}>
              <CancelButton onPress={popToTop} />
              <ValidateButton onPress={createActivity} disabled={name === ''} />
            </View>
          </View>
        </>
      );
    }
  };

  return render();
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
