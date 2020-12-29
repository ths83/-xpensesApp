import React, {useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, CheckBox, Input} from 'react-native-elements';
import {
  FIRST_USER,
  SECOND_USER,
  TEST_USER,
} from '../../config/UsersConfiguration';
import {createActivity} from '../../api/ActivityService';
import {useNavigation} from '@react-navigation/native';

const CreateActivityScreen = () => {
  const [name, setName] = useState<string>('');
  const [testUserSelected, setTestUserSelected] = useState<boolean>(false);
  const [firstUserSelected, setFirstUserSelected] = useState<boolean>(false);
  const [secondUserSelected, setSecondUserSelected] = useState<boolean>(false);
  const [activityId, setActivityId] = useState<string>();
  const {navigate} = useNavigation();

  async function callCreateActivity() {
    createActivity(name, TEST_USER)
      .then((a) => setActivityId(a.id))
      .catch((error) => {
        console.log(error);
      });
  }

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
      <Button
        title={'Create'}
        onPress={() => {
          callCreateActivity();
          console.log(activityId);
          navigate('ActivityDetails', {
            activityId: activityId,
          });
        }}
      />
    </>
  );
};

export default CreateActivityScreen;
