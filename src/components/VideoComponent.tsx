import {
    AppState,
    Dimensions,
    GestureResponderEvent,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Video, { OnLoadData, OnProgressData } from 'react-native-video';
import * as Progress from 'react-native-progress';
import { gray300, green } from '../assets/resources/Colors';

const screenWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;

interface IVideoComponentProps {
    videoUrl: string;
    isNewItem: boolean;
    isVideoPaused: boolean;
    isVideoMuted: boolean;
    onVideoClick: (event: GestureResponderEvent) => void;
}

const VideoComponent: React.FC<IVideoComponentProps> = props => {
    const { videoUrl, isNewItem, isVideoPaused, isVideoMuted, onVideoClick } = props;
    const appState = useRef(AppState.currentState);
    const [isPaused, setIsPaused] = useState(isVideoPaused);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                setIsPaused(false);
            } else {
                setIsPaused(true);
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const onLoad = (e: OnLoadData) => {
        setDuration(e.duration);
    }

    const onProgress = (e: OnProgressData) => {
        setProgress(e.currentTime / duration)
    }

    return (
        <View style={styles.mainContainer}>
            <Progress.Bar
                progress={progress}
                color={green}
                unfilledColor={gray300}
                useNativeDriver={true}
                width={screenWidth}
                height={4}
                borderRadius={0}
                borderWidth={0}
                style={styles.progressStyle} />
            <Video
                source={{ uri: videoUrl }}
                paused={isPaused || isNewItem}
                controls={false}
                style={styles.videoStyle}
                resizeMode={'contain'}
                repeat={true}
                muted={isVideoMuted}
                onLoad={onLoad}
                onProgress={onProgress}
            />
            <TouchableOpacity
                style={styles.controllerStyle}
                activeOpacity={1}
                onLongPress={() => setIsPaused(true)}
                onPressOut={() => setIsPaused(false)}
                onPress={onVideoClick}
            />
        </View>
    );
};

export default VideoComponent;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingBottom: Platform.select({
            ios: 90,
        }),
    },
    videoStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controllerStyle: {
        height: windowHeight,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    progressStyle: {
        marginTop: 4,
    }
});
