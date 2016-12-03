import Exponent from 'exponent';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Facebook } from 'exponent';

async function facebookAuth() {
  const APPID = '1168083766644005';
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    APPID, {
      permissions: ['public_profile'],
      behavior: 'web'
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
    Alert.alert(
      'Logged in!',
      `Hi ${(await response.json()).name}!`,
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={facebookAuth}>Login with FB</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Exponent.registerRootComponent(App);
