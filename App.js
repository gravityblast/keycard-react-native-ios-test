import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NativeEventEmitter, NativeModules } from 'react-native'
import { RNStatusKeycard } from 'react-native-status-keycard';

NativeModules.RNStatusKeycard.nfcIsSupported().then((b) => console.log("Has NFC: " + b));

let eventEmitter;

try {
  eventEmitter = new NativeEventEmitter(NativeModules.RNStatusKeycard);
} catch(e) {
  console.log("error: ", e)
}

const onConnected = (x) => {
  console.log("connected --", x)

  // NativeModules.RNStatusKeycard.init("333333")
  //   .then(x => Alert.alert(x.toString()))
  //   .catch(x => Alert.alert(x.toString()));
}

const onDisconnected = (x) => {
  console.log("disconnected --", x)
}

let onConnectedSub,
    onDisconnectedSub;

export default function App() {
  useEffect(() => {
    onConnectedSub = eventEmitter.addListener('keyCardOnConnected', onConnectedSub);
    onDisconnectedSub = eventEmitter.addListener('keyCardOnDisconnected', onDisconnected);

    return () => {
      onConnectedSub.remove();
      onDisconnectedSub.remove();
    }
  });

  NativeModules.RNStatusKeycard.startNFC("HEY")

  const clickHandler = () => {
    console.log("clickHandler")
    // NativeModules.RNStatusKeycard.nfcIsSupported()
    // NativeModules.RNStatusKeycard.signPinless(hash)
    //   .then(x => Alert.alert(x.toString()))
    //   .catch(x => Alert.alert(x.toString()));

    NativeModules.RNStatusKeycard.startNFC("START")
      .then(x => {
        console.log("started")
      })
      .catch(err => {
        console.log("failed", err, "trying stoppping")
        NativeModules.RNStatusKeycard.stopNFC("STOP")
          .then(x => {
            console.log("stopped")
          })
          .catch(x => {
            console.log("error stopping", x)
          })
      })
  }

  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <Button
        title="INIT"
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
