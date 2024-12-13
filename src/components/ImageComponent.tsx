import { Animated, Platform, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import ProgressBarArray from './ProgressBarArray';
import { ProductImages } from '../types/Type';

interface IImageComponentProps {
    productImages: ProductImages[];
    isNewItem: boolean;
}

const ImageComponent: React.FC<IImageComponentProps> = props => {
    const { productImages, isNewItem } = props;

    const [itemIndex, setCurrentItemIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);

    const animateOpacityValue = new Animated.Value(0.9);

    const onLoad = () => {
        Animated.timing(animateOpacityValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onLoadEnd = () => {
        setImageLoaded(true);
    };

    const nextItem = () => {
        setImageLoaded(false);
        setCurrentItemIndex(index => {
            if (index < productImages.length - 1) {
                return (index += 1);
            }
            return 0;
        });
    };

    const animatedImage = () => (
        <Animated.Image
            source={{ uri: productImages[itemIndex].imageUrl }}
            resizeMode="contain"
            style={[styles.imageStyle, { opacity: animateOpacityValue }]}
            onLoad={onLoad}
            onLoadEnd={onLoadEnd}
        />
    )

    return (
        <View style={styles.mainContainer}>
            <ProgressBarArray
                data={productImages}
                isNewItem={isNewItem}
                currentIndex={itemIndex}
                nextItem={nextItem}
                imageLoaded={imageLoaded}
            />
            {imageLoaded ? animatedImage() : animatedImage()}
        </View>
    );
};

export default ImageComponent;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingBottom: Platform.select({
            ios: 90,
        }),
    },
    imageStyle: {
        flex: 1,
    },
});
