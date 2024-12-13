import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { apiRequest } from '../../services/Apiclient';
import VideoComponent from '../../components/VideoComponent';
import { ShoppingReelDataProps } from '../../types/Type';
import LoadingScreen from '../../components/common/LoadingScreen';
import ErrorScreen from '../../components/common/ErrorScreen';
import videosAndImages from './VideosAndImages.json';
import { black } from '../../assets/resources/Colors';
import { activeTabName } from '../../navigation/NavigationService';
import { ShoppingReel } from '../../navigation/ScreenNames';
import ImageComponent from '../../components/ImageComponent';

const ShoppingReelScreen = () => {
  const [videoData, setVideoData] = useState<ShoppingReelDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRetry, setShowRetry] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [extraData, setExtraData] = useState(false);
  const [viewableItems, setViewableItems] = useState(0);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const PAGE_SIZE = 5;
  const currentScreen = activeTabName();

  useEffect(() => {
    fetchData();
    if (currentScreen !== ShoppingReel) {
      setIsVideoPaused(true);
    } else {
      setIsVideoPaused(false);
    }

    return () => {
    };
  }, [currentScreen]);

  const fetchData = async () => {
    setIsLoading(true);
    setShowRetry(false);
    await apiRequest<[ShoppingReelDataProps]>(
      'GET',
      'https://picsum.photos/v2/list',
    )
      .then(value => {
        setVideoData(videosAndImages.slice(0, PAGE_SIZE));
      })
      .catch(() => {
        setShowRetry(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadMoreData = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    // Check if more data exists
    if (startIndex < videosAndImages.length) {
      const newData = videosAndImages.slice(startIndex, endIndex);
      setVideoData(prevData => [...prevData, ...newData]);
      setCurrentPage(nextPage);
      setExtraData(extraData => !extraData);
    }
  };

  const retryFetchingData = () => {
    fetchData();
  };

  const viewConfigRef = useRef({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95,
  });

  const onViewRef = useRef(({ viewableItems, changed }: any) => {
    if (viewableItems.length > 0) {
      setViewableItems(viewableItems[0].index);
    }
  });

  const onVideoClick = () => {
    setIsVideoMuted(mute => !mute);
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ShoppingReelDataProps>) => {
    const { type, videoUrl, productImages } = item;
    return (
      <View key={index} style={styles.mainContainer}>
        {type == 'video' ? (
          <VideoComponent
            videoUrl={videoUrl}
            isNewItem={index !== viewableItems}
            isVideoPaused={isVideoPaused}
            isVideoMuted={isVideoMuted}
            onVideoClick={onVideoClick}
          />
        ) : (
          <ImageComponent productImages={productImages} isNewItem={index !== viewableItems} />
        )}
      </View>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }
    if (showRetry) {
      return <ErrorScreen onRetry={retryFetchingData} />;
    }
    return (
      <FlatList
        data={videoData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        extraData={extraData}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        bounces={false}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreData}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderContent()}
    </View>
  );

};

export default ShoppingReelScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: black,
    height: Dimensions.get('window').height,
  },
});
