import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import SlideItem from './SlideItem';
import Pagination from './Pagination';


const Slider = () => {
    const slides = [
        {
            id: 1,
            img: require('../assets/images1.jpeg'),
            title: 'Apple Watch Series 7',
            description: 'The future of health is on your wrist',
            price: '$399',
        },
        {
            id: 2,
            img: require('../assets/images2.jpg'),
            title: 'AirPods Pro',
            description: 'Active noise cancellation for immersive sound',
            price: '$249',
        },
        {
            id: 3,
            img: require('../assets/images3.jpg'),
            title: 'AirPods Max',
            description: 'Effortless AirPods experience',
            price: '$549',
        },
        {
            id: 4,
            img: require('../assets/images4.jpg'),
            title: 'Charger',
            description: "It's not magic, it's just science",
            price: '$49',
        },
        {
            id: 5,
            img: require('../assets/images2.jpg'),
            title: 'Smart Lock',
            description: 'Unlock your door with your phone',
            price: '$199',
        },
        ];
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    // setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={slides}
        renderItem={({item}) => <SlideItem item={item}/>}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={slides} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});