import {Auth} from 'aws-amplify';
import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {blue, grey, red} from '../../themes/colors';
import {sLarge, sMedium, sXLarge} from '../../themes/size';
import LogoutButton from '../buttons/LogoutButton';

const LogoutHeaderComponent = () => {
  const [visible, setVisible] = useState(false);

  async function signOut() {
    await Auth.signOut();
  }

  const LogoutOverlay = () => {
    return (
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={styles.container}>
        <Button
          title="Sign out"
          onPress={() => {
            signOut();
            setVisible(false);
          }}
          buttonStyle={[styles.logoutButton, styles.button]}
        />
        <Button
          title="Back"
          onPress={() => setVisible(false)}
          buttonStyle={[styles.backButton, styles.button]}
        />
      </Overlay>
    );
  };

  return (
    <>
      <LogoutButton onPress={() => setVisible(true)} />
      <LogoutOverlay />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: grey,
  },
  button: {
    padding: sXLarge,
    paddingBottom: sMedium,
    paddingTop: sMedium,
    margin: sLarge,
  },
  logoutButton: {
    backgroundColor: blue,
  },
  backButton: {
    backgroundColor: red,
  },
});

export default memo(LogoutHeaderComponent);
