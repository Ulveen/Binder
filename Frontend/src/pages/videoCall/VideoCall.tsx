import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, PermissionsAndroid, Platform, Text, ActivityIndicator, Touchable, TouchableOpacity } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import useCustomTheme from "../../hooks/useCustomTheme";
import CustomTheme from "../../models/CustomTheme";
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import CustomButton from '../../components/CustomButton';
import useAuth from '../../hooks/useAuth';

let ws: WebSocket | null = null;

export default function VideoCall() {
    const { user } = useAuth()
    const { theme } = useCustomTheme();
    const [styles, setStyles] = useState(getStyles(theme));
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [callId, setCallId] = useState('');
    const [isCallActive, setIsCallActive] = useState(false);

    useEffect(() => {
        const requestPermissions = async () => {
            if (Platform.OS === 'ios') {
                const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
                const micStatus = await request(PERMISSIONS.IOS.MICROPHONE);

                if (cameraStatus === RESULTS.GRANTED && micStatus === RESULTS.GRANTED) {
                    setPermissionsGranted(true);
                } else {
                    console.error('Permission denied.');
                }
            } else if (Platform.OS === 'android') {
                const cameraStatus = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA
                );
                const micStatus = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
                );

                if (cameraStatus === PermissionsAndroid.RESULTS.GRANTED && micStatus === PermissionsAndroid.RESULTS.GRANTED) {
                    setPermissionsGranted(true);
                } else {
                    console.error('Permission denied.');
                }
            }
        };
        requestPermissions();
    }, []);

    useEffect(() => {
        setStyles(getStyles(theme));
    }, [theme])

    async function handleStartCall() {
        setIsCallActive(true);
        makeConnection();
    }

    function handleOnOpenWebSocket(ws: WebSocket) {
        const payload = JSON.stringify({
            email: user!.email,
            type: 'init'
        })
        ws?.send(payload)
    }

    function handleOnMessageWebSocket(event: WebSocketMessageEvent) {
        const parsed = JSON.parse(event.data);
        console.log(parsed);

        if (parsed.newCallId) {
            setCallId(parsed.newCallId);
        }
        else if (parsed.type === 'next') {
            setCallId('');
        }
    }

    function handleOnCloseWebSocket() {
        setIsCallActive(false);
        setCallId('');
    }

    async function makeConnection() {
        ws = new WebSocket(process.env.WEBSOCKET_URL!);
        console.log(process.env.WEBSOCKET_URL!);

        ws.onopen = () => handleOnOpenWebSocket(ws!);
        ws.onmessage = (event) => handleOnMessageWebSocket(event);
        ws.onclose = () => handleOnCloseWebSocket();
    }

    async function handleHangUp() {
        if (ws) {
            ws.close();
        }
        setIsCallActive(false);
        setCallId('');
    }

    async function handleNext() {
        setCallId('');
        const paylosd = JSON.stringify({
            email: user!.email,
            type: 'next'
        })
        ws?.send(paylosd);
    }

    return (
        <View style={styles.container}>
            {!permissionsGranted ? (
                <View>
                    <Text>Requesting permissions...</Text>
                </View>
            ) : (
                !isCallActive ?
                    <CustomButton style={styles.startCallButton} onPress={handleStartCall}>
                        <Text style={styles.startCallButtonText}>Start Call</Text>
                    </CustomButton> :
                    callId.length === 0 ? (
                        <View style={styles.loadingContainer}>
                            <View style={styles.loadingIndicatorContainer}>
                                <ActivityIndicator size="large" color="#E94057" />
                                <Text>Searching for matches...</Text>
                            </View>
                            <CustomButton style={styles.cancelButton} onPress={handleHangUp}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </CustomButton>
                        </View>
                    ) : (
                        <View style={styles.callContainer}>
                            <ZegoUIKitPrebuiltCall
                                appID={977072623}
                                appSign={"558aab41c164e1a892e8c0bc5faaf68413ec1ed09bdb01c2648137c2a51bc262"}
                                userID={user!.email}
                                userName={user!.name}
                                callID={callId}
                                config={{
                                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                                    onHangUp: handleHangUp
                                }}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                                    <Text>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
            )}
        </View>
    );
}

const getStyles = (theme: CustomTheme) => StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
    },
    startCallButton: {
        width: '50%'
    },
    startCallButtonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'ABeeZee'
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loadingIndicatorContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    cancelButton: {
        width: '50%',
        backgroundColor: theme.primary,
        textAlign: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'ABeeZee'
    },
    localVideo: {
        width: '100%',
        height: '50%',
        backgroundColor: 'black',
    },
    callContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        zIndex: 1000,
    },
    nextButton: {
        backgroundColor: theme.primary,
        padding: 10,
        borderRadius: 5,
    },
});
