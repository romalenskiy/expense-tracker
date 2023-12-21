import { Button } from '@ui/Button';
import { Colors } from '@ui/constants/colors';
import { router } from 'expo-router';
import React, { FC, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { AuthForm } from './AuthForm';
import { Credentials, CredentialsInvalid } from './types';

type Props = {
  isLogin?: boolean;
  onSubmit: (params: { email: string; password: string }) => void;
};

export const AuthMain: FC<Props> = ({ isLogin, onSubmit }) => {
  const [credentialsInvalid, setCredentialsInvalid] =
    useState<CredentialsInvalid>({
      email: false,
      password: false,
      confirmPassword: false,
    });

  const switchAuthModeHandler = () => {
    if (isLogin) {
      router.replace('/signup');
    } else {
      router.replace('/login');
    }
  };

  const submitHandler = (credentials: Credentials) => {
    let { email, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert(
        'Invalid input',
        'Please check your entered credentials. Password must be > 6 symbols',
      );
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });

      return;
    }

    onSubmit({ email, password });
  };

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />

      <View style={styles.buttons}>
        <Button mode="flat" onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },

  buttons: {
    marginTop: 8,
  },
});
