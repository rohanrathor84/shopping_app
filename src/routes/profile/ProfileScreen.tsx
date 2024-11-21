import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { navigationRef } from '../../navigation/NavigationService';
import { Statistics } from '../../navigation/ScreenNames';

const ProfileScreen = () => {
  const handlePress = () => {
    navigationRef.navigate(Statistics);
  }

  return (
    <View>
      <Button title='Stats' onPress={handlePress} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
