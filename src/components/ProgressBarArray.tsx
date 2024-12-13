import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { ProductImages } from '../types/Type';
import { gray300, green } from '../assets/resources/Colors';

const windowWidth = Dimensions.get('window').width;

interface IProgressBarArrayProps {
  data: ProductImages[];
  isNewItem: boolean;
  currentIndex: number;
  nextItem: Function;
  imageLoaded: boolean;
}

const ProgressBarArray: React.FC<IProgressBarArrayProps> = props => {
  const { data, isNewItem, currentIndex, nextItem, imageLoaded } = props;

  return (
    <View style={styles.progressBarArrayContainer}>
      {data.map((value, index) => (
        <ProgressBarItem
          key={index}
          nextItem={nextItem}
          isNewItem={isNewItem}
          active={index === currentIndex ? 1 : index < currentIndex ? 2 : 0}
          imageLoaded={imageLoaded}
          barCount={data.length}
        />
      ))}
    </View>
  );
};

export default ProgressBarArray;

interface IProgressBarItemProps {
  nextItem: Function;
  isNewItem: boolean;
  active: number;
  imageLoaded: boolean;
  barCount: number;
}

const ProgressBarItem: React.FC<IProgressBarItemProps> = props => {
  const { isNewItem, active, nextItem, imageLoaded, barCount } = props;

  const [progress, setProgress] = useState(0);

  const barWidth = windowWidth / barCount - 6;
  let interval: NodeJS.Timeout;

  const startProgress = () => {
    interval = setInterval(() => {
      setProgress(progress => {
        progress += 0.01;
        if (Math.floor(progress) === 1) {
          stopProgress();
          nextItem();
        }
        return progress;
      });
    }, 100);
  };

  const stopProgress = () => {
    clearInterval(interval);
  }

  useEffect(() => {
    switch (active) {
      case 2:
        return setProgress(1);
      case 1:
        return imageLoaded && !isNewItem ? startProgress() : setProgress(0);
      case 0:
        return setProgress(0);
      default:
        return setProgress(0);
    }
  }, [imageLoaded, isNewItem]);

  return (
    <View style={styles.progressBarItemcontainer}>
      <Progress.Bar
        progress={progress}
        width={barWidth}
        height={4}
        borderRadius={4}
        borderWidth={0}
        color={green}
        unfilledColor={gray300}
        useNativeDriver={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarArrayContainer: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingHorizontal: 4,
    width: windowWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBarItemcontainer: {
    flex: 1,
  },
});
