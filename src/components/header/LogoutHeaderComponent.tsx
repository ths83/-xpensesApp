import {Auth} from 'aws-amplify';
import React, {memo, useState} from 'react';
import LogoutButton from '../buttons/LogoutButton';
import LogoutPopUp from '../popUp/LogoutPopUp';

const LogoutHeaderComponent = () => {
  const [visible, setVisible] = useState(false);

  async function signOut() {
    await Auth.signOut();
  }

  return (
    <>
      <LogoutButton onPress={() => setVisible(true)} />
      <LogoutPopUp
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        handleCancel={() => setVisible(false)}
        handleValidate={signOut}
      />
    </>
  );
};

export default memo(LogoutHeaderComponent);
