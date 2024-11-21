import React, { useEffect } from 'react';
import {
  Platform,
  Alert,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const HomeScreen = () => {
  async function requestNotificationPermission() {
    const authStatus = await messaging().requestPermission();
    const isAuthorized =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (isAuthorized) {
      console.log('Authorization status:', authStatus);
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    } else {
      Alert.alert('Notification permissions denied');
    }

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('POST_NOTIFICATIONS permission granted');
      } else {
        Alert.alert(
          'Notification permissions are required to receive notifications',
        );
      }
    }
  }

  useEffect(() => {
    requestNotificationPermission();

    // Handle incoming messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
