import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { blackShade, gray100, lightBlue } from '../../assets/resources/Colors';

type ErrorScreenProps = {
    message?: string; // Custom error message
    onRetry: () => void; // Function to call on retry
    buttonText?: string; // Text for the retry button
};

const ErrorScreen: React.FC<ErrorScreenProps> = ({
    message = 'Something went wrong. Please try again.',
    onRetry,
    buttonText = 'Retry',
}) => {
    return (
        <View style={styles.container}>
            <CustomText style={styles.message}>{message}</CustomText>
            <Button title={buttonText} onPress={onRetry} color={lightBlue} />
        </View>
    );
};

export default ErrorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: gray100,
    },
    message: {
        fontSize: 18,
        color: blackShade,
        textAlign: 'center',
        marginBottom: 20,
    },
});
