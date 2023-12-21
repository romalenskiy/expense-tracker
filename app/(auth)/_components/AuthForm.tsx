import { Button } from '@ui/Button';
import { Input } from '@ui/Input';
import { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Credentials, CredentialsInvalid } from './types';

type Props = {
  isLogin?: boolean;
  onSubmit: (credential: Credentials) => void;
  credentialsInvalid: CredentialsInvalid;
};

export const AuthForm: FC<Props> = ({
  isLogin,
  onSubmit,
  credentialsInvalid,
}) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  const updateInputValueHandler = (
    inputType: keyof Credentials,
    enteredValue: string,
  ) => {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  };

  const submitHandler = () => {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  };

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          onChangeText={(text) => updateInputValueHandler('email', text)}
          value={enteredEmail}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
          isInvalid={emailIsInvalid}
        />

        <Input
          label="Password"
          onChangeText={(text) => updateInputValueHandler('password', text)}
          secureTextEntry
          value={enteredPassword}
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          isInvalid={passwordIsInvalid}
        />

        {!isLogin && (
          <Input
            label="Confirm Password"
            onChangeText={(text) =>
              updateInputValueHandler('confirmPassword', text)
            }
            secureTextEntry
            value={enteredConfirmPassword}
            autoComplete="off"
            isInvalid={passwordsDontMatch}
          />
        )}

        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {},

  buttons: {
    marginTop: 12,
  },
});
