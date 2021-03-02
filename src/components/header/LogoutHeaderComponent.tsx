import React, {memo, useState} from 'react';
import {Button, Icon, Overlay} from 'react-native-elements';
import {Auth} from 'aws-amplify';
import {white} from '../../themes/colors';
import {imedium} from '../../themes/icons';

const LogoutHeaderComponent = () => {
  const [visible, setVisible] = useState(false);

  async function signOut() {
    await Auth.signOut();
  }

  function confirmLogout() {
    return (
      <>
        <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
          <Button
            title="Logout"
            onPress={() => {
              signOut();
              setVisible(false);
            }}
          />
          <Button title="Close" onPress={() => setVisible(false)} />
        </Overlay>
      </>
    );
  }

  return (
    <>
      <Icon
        size={imedium}
        color={white}
        name="logout"
        onPress={() => setVisible(true)}
      />
      {confirmLogout()}
    </>
  );
};

export default memo(LogoutHeaderComponent);
