import React, {useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, CheckBox, Input, Text} from 'react-native-elements';
import {
  FIRST_USER,
  SECOND_USER,
  TEST_USER,
} from '../../config/UsersConfiguration';
import {createActivity} from '../../api/ActivityService';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {activityAtom} from '../../../App';
import {Status} from '../../commons/enums/Status';

const AddActivityScreen = () => {
  const [name, setName] = useState<string>('');
  const [testUserSelected, setTestUserSelected] = useState<boolean>(false);
  const [firstUserSelected, setFirstUserSelected] = useState<boolean>(false);
  const [secondUserSelected, setSecondUserSelected] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [, setActivity] = useAtom(activityAtom);

  const {navigate} = useNavigation();

  return (
    <>
      <View>
        <Input placeholder="Name" onChangeText={(text) => setName(text)} />
      </View>
      <ScrollView>
        {/*TODO test only : remove before production build*/}
        <CheckBox
          title={TEST_USER}
          checked={testUserSelected}
          onPress={() => setTestUserSelected(!testUserSelected)}
        />
        {/*TODO END*/}
        <CheckBox
          title={FIRST_USER}
          checked={firstUserSelected}
          onPress={() => setFirstUserSelected(!firstUserSelected)}
        />
        <CheckBox
          title={SECOND_USER}
          checked={secondUserSelected}
          onPress={() => setSecondUserSelected(!secondUserSelected)}
        />
      </ScrollView>
      <Text>
        {status === Status.ERROR &&
          'An error occurred while adding new activity'}
      </Text>
      <Button
        title={'Create'}
        onPress={() => {
          createActivity(name, TEST_USER)
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

export default AddActivityScreen;
