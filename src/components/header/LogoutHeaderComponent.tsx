import React, {useState} from 'react';
import {Button, Icon, Overlay} from 'react-native-elements';
import {Auth} from 'aws-amplify';

const LogoutHeaderComponent = () => {
  const [visible, setVisible] = useState(false);

  async function signOut() {
    await Auth.signOut()
      .then(() => console.debug('User has signed out'))
      .catch((err) => console.debug(err));
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
        name="logout"
        onPress={() => {
          setVisible(true);
        }}
      />
      {confirmLogout()}
    </>
  );
};

export default LogoutHeaderComponent;
