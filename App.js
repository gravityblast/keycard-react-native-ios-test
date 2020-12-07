import { StatusBar } from 'expo-status-bar';
import { EventRegister } from 'react-native-event-listeners';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert,  } from 'react-native';

import { NativeModules, DeviceEventEmitter, NativeEventEmitter, Platform } from 'react-native'
import { RNStatusKeycard } from 'react-native-status-keycard';

NativeModules.RNStatusKeycard.nfcIsSupported().then((b) => console.log("Has NFC: " + b));

export default function App() {
  const startHandler = () => {
    hash = "0x0000000000000000000000000000000000000000000000000000000000000001";
    // NativeModules.RNStatusKeycard.nfcIsSupported()
    // NativeModules.RNStatusKeycard.signPinless(hash)
    //   .then(x => Alert.alert(x.toString()))
    //   .catch(x => Alert.alert(x.toString()));
    NativeModules.RNStatusKeycard.startNFC()
      .then(x => console.log("-------------- started"))
      .catch(x => Alert.alert(x.toString()));
  }

  const stopHandler = () => {
    hash = "0x0000000000000000000000000000000000000000000000000000000000000001";
    // NativeModules.RNStatusKeycard.nfcIsSupported()
    // NativeModules.RNStatusKeycard.signPinless(hash)
    //   .then(x => Alert.alert(x.toString()))
    //   .catch(x => Alert.alert(x.toString()));
    NativeModules.RNStatusKeycard.stopNFC()
      .then(x => console.log("-------------- stopped"))
      .catch(x => Alert.alert(x.toString()));
  }

  useEffect(() => {
    console.log("------------------OKOKOK")
    // const emitter = new NativeEventEmitter(NativeModules.ReactNativeEventEmitter);

    // console.log("====================== OK")
    // EventRegister.addEventListener('keyCardOnConnected', (data) => {
    //   Alert.alert(`ON CONNECT: ${data}`);
    // })

    // EventRegister.addEventListener('keyCardOnDisconnected', (data) => {
    //   Alert.alert(`ON DISCONNECT: ${data}`);
    // })
  });

  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <Button
        title="START"
        onPress={startHandler}
      />
      <Button
        title="STOP"
        onPress={stopHandler}
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
