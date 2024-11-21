import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';
import ProductDetailsScreen from './src/routes/productDetails/ProductDetailsScreen';
import NotificationsScreen from './src/routes/notifications/NotificationsScreen';
import ProfileScreen from './src/routes/profile/ProfileScreen';
import {
  BottomTab,
  Notifications,
  ProductDetails,
  Profile,
  Statistics,
} from './src/navigation/ScreenNames';
import AppHeader from './src/components/AppHeader';
import messaging from '@react-native-firebase/messaging';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/Store';
import StatisticsScreen from './src/routes/statistics/StatisticsScreen';
import { navigationRef } from './src/navigation/NavigationService';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#000" : "#fff",
    flex: 1
  };
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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
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
              options={{ headerShown: false }}
            />
            <Stack.Screen name={ProductDetails} component={ProductDetailsScreen} />
            <Stack.Screen name={Notifications} component={NotificationsScreen} />
            <Stack.Screen name={Profile} component={ProfileScreen} />
            <Stack.Screen name={Statistics} component={StatisticsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
