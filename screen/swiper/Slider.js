import { Animated, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import Slides from '../data'
import SlideItem from './SlideItem'
import Pagination from './Pagination'
const Slider = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const listRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current
    const handleOnScroll = event => {
        Animated.event([
            {
                nativeEvent: {
                    contentOffset: {
                        x: scrollX,

                    }
                }
            }
        ], {
            useNativeDriver: false,
        })(event)

    };

    const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
        // console.log('viewableItems',viewableItems);
        setIndex(viewableItems[0].index)

    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current

    return (
        <View>
            <FlatList
                ref={listRef}
                data={Slides}
                renderItem={({ item, index }) =>
                <SlideItem
                 item={item}
                 listRef={listRef}
                 index={index} 
                 listLength={Slides.length} 
                 navigation={navigation} />}
                horizontal
                pagingEnabled
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
            <Pagination data={Slides} scrollX={scrollX} index={index} />
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({})