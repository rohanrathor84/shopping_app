import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';
import ProductDetailsScreen from './src/routes/productDetails/ProductDetailsScreen';
import NotificationsScreen from './src/routes/notifications/NotificationsScreen';
import ProfileScreen from './src/routes/profile/ProfileScreen';
import {
  BottomTab,
  Notifications,
  ProductDetails,
  Profile,
} from './src/navigation/ScreenNames';
import AppHeader from './src/components/AppHeader';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        }
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: props => (
            <AppHeader
              appNavigation={props.navigation}
              appRoute={props.route}
              {...props}
            />
          ),
        }}>
        <Stack.Screen
          name={BottomTab}
          component={BottomTabsNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name={ProductDetails} component={ProductDetailsScreen} />
        <Stack.Screen name={Notifications} component={NotificationsScreen} />
        <Stack.Screen name={Profile} component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
