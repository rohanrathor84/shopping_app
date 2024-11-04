import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';
import {Notifications, Profile} from '../navigation/ScreenNames';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, Route} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

interface AppHeaderProps {
  title?: string;
  appNavigation:
    | NativeStackNavigationProp<ParamListBase, string, undefined>
    | BottomTabNavigationProp<ParamListBase, string, undefined>;
  appRoute: Route<string>;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  appNavigation,
  appRoute,
}) => {
  const {name} = appRoute;

  const onNotificationsPress = () => {
    appNavigation.navigate(Notifications);
  };

  const onProfilePress = () => {
    appNavigation.navigate(Profile);
  };

  return (
    <View style={styles.container}>
      {name === Notifications || name === Profile ? (
        <View style={styles.leftSubContainer}>
          <TouchableOpacity
            onPress={() => appNavigation.goBack()}
            activeOpacity={1}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <CustomText style={styles.subTitle}>{name}</CustomText>
        </View>
      ) : (
        <CustomText style={styles.title}>{title}</CustomText>
      )}
      {name !== Notifications && name !== Profile && (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onNotificationsPress} activeOpacity={1}>
            <Octicons name="bell" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onProfilePress}
            activeOpacity={1}
            style={styles.iconSpacing}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: '#f8f8f8',
  },
  leftSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 16,
  },
});

export default AppHeader;
