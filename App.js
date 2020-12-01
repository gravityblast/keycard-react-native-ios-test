import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import { NativeModules } from 'react-native'
import { RNStatusKeycard } from 'react-native-status-keycard';

NativeModules.RNStatusKeycard.nfcIsSupported().then((b) => console.log("Has NFC: " + b));

export default function App() {
  const clickHandler = () => {
    hash = "0x0000000000000000000000000000000000000000000000000000000000000001";
    // NativeModules.RNStatusKeycard.nfcIsSupported()
    NativeModules.RNStatusKeycard.signPinless(hash)
      .then(x => Alert.alert(x.toString()))
      .catch(x => Alert.alert(x.toString()));
  }

  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <Button
        title="SIGN"
        onPress={clickHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
