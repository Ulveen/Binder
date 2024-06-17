import React, { useState, useEffect } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import useCustomTheme from "../../hooks/useCustomTheme";
import CustomTheme from "../../models/CustomTheme";
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'

export default function VideoCall() {
  const { theme } = useCustomTheme();
  const styles = getStyles(theme);
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'ios') {
        const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
        const micStatus = await request(PERMISSIONS.IOS.MICROPHONE);

        if (cameraStatus !== RESULTS.GRANTED || micStatus !== RESULTS.GRANTED) {
          console.error('Permission denied.');
          return;
        }
      } else if (Platform.OS === 'android') {
        const cameraStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        const micStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );

        if (cameraStatus !== PermissionsAndroid.RESULTS.GRANTED || micStatus !== PermissionsAndroid.RESULTS.GRANTED) {
          console.error('Permission denied.');
          return;
        }
      }
    };
  }, []);

  return (
      <View style={styles.container}>
        <ZegoUIKitPrebuiltCall
            appID={977072623}
            appSign={"558aab41c164e1a892e8c0bc5faaf68413ec1ed09bdb01c2648137c2a51bc262"}
            userID={"abc2"} 
            userName={"budi"}
            callID={"aaa111"} // callID can be any unique string. 

            config={{
                // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                // onOnlySelfInRoom: () => { props.navigation.navigate('HomePage') },
                // onHangUp: () => { props.navigation.navigate('HomePage') },
            }}
        />
    </View>
  );
}

const getStyles = (theme: CustomTheme) => StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "blue"
  },
  localVideo: {
    width: '100%',
    height: '50%',
    backgroundColor: 'black',
  },
});
