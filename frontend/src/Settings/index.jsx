import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from 'react-navigation-hooks';
import {
  View, Text, StyleSheet,
  ImageBackground, ActivityIndicator,
} from 'react-native';
import { Toast } from 'native-base';
import validation from '../common/helper';
import Colors from '../common/colors';
import { logout } from '../Login/actionCreator';

import background from '../../assets/login/background.jpg';

import { InputField } from '../common/components';
import SubmitButton from './SubmitButton';
import { changeSettings, CHANGE_SETTINGS_SUCCESS } from './actionCreator';

const styles = StyleSheet.create({
  titleText: {
    margin: 20,
    alignSelf: 'center',
    fontSize: 36,
    color: Colors.whiteColor,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 16,
    color: Colors.whiteColor,
  },
  buttonRow: {
    height: 60,
    paddingTop: 6,
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignSelf: 'center',
    width: 300,
  },
  background: {
    width: '100%',
    height: '100%',
  },
});

function Settings() {
  const { isLoading, error } = useSelector((state) => state.settings);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [kingdomName, setKingdomName] = useState('');
  const [password, setPassword] = useState('');
  const { token } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function resetForm() {
    setEmail('');
    setUsername('');
    setKingdomName('');
    setPassword('');
  }

  function showAlert(text) {
    Toast.show({
      type: 'Warning',
      duration: 3000,
      text,
      buttonText: 'Okay',
    });
  }

  async function handleSubmit() {
    const settings = {};
    if (email) {
      if (!validation(email)) {
        showAlert('Please reenter a valid email');
        return;
      }
      settings.email = email;
    }
    if (username) {
      if (username.length < 3) {
        showAlert('Please reenter a valid username');
      }
      settings.username = username.toLowerCase();
    }
    if (kingdomName) {
      settings.kingdomName = kingdomName;
    }
    if (password) {
      if (password.length < 8) {
        showAlert('Password must be at least 8 characters');
        return;
      }
      settings.password = password;
    }
    const { type: actionType, payload } = await dispatch(changeSettings(settings, token));
    let message = '';
    if (actionType === CHANGE_SETTINGS_SUCCESS) {
      if (payload.changes.length === 1) {
        message += `${payload.changes[0]} is successfully changed!`;
      } else if (payload.changes.length > 1) {
        message += `${payload.changes.join(', ')} are successfully changed!`;
      } else {
        showAlert(payload);
      }
      Toast.show({
        type: 'success',
        duration: 3000,
        text: message,
        buttonText: 'Okay',
      });
    } else {
      showAlert(error);
      return;
    }
    resetForm();
  }

  function handleLogout() {
    dispatch(logout());
    navigation.navigate('Auth');
  }

  const submitButtonIsDisabled = email === '' && username === '' && kingdomName === '' && password === '';

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.tealColor} />;
  }

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={background}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>Settings</Text>

        <InputField
          placeholder="Username"
          value={username}
          onChangeText={(value) => setUsername(value)}
        />

        <InputField
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />

        <InputField
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
        />

        <InputField
          placeholder="Kingdom Name"
          value={kingdomName}
          onChangeText={(value) => setKingdomName(value)}
        />

        <View style={styles.buttonRow}>
          <SubmitButton onPress={handleSubmit} disabled={submitButtonIsDisabled} text="Save" />
          <SubmitButton onPress={handleLogout} text="Logout" />
        </View>
      </View>
    </ImageBackground>
  );
}

export default Settings;
