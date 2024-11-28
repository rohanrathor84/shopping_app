import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { darkgray, gray100, lightBlue } from '../../assets/resources/Colors';

type LoadingScreenProps = {
    message?: string; // Optional message to display
    color?: string;   // Color of the loader
    size?: 'small' | 'large'; // Size of the loader
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({
    message = 'Loading...',
    color = lightBlue,
    size = 'large'
}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
            {message ? <CustomText style={styles.message}>{message}</CustomText> : null}
        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: gray100, // Optional background color
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        color: darkgray,
    },
});
