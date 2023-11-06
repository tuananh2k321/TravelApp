import { COLOR, ICON } from '../../constant/Themes'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image, Animated, TouchableOpacity } from 'react-native'

const Item_wishlist = ({ data, handleDelete }) => {
    // console.log('data>>>>>', data)
    // const [isSwiped, setIsSwiped] = useState(false);
    const rightSwipe = () => {
        return (
            <TouchableOpacity onPress={handleDelete} style={{
                justifyContent: "center",
                alignItems: "center",
            }} >
                <View style={styles.deleteBox}>
                    <Animated.Text style={styles.textDelete}>Delete</Animated.Text>
                </View>

            </TouchableOpacity>
        )
    }
    return (
        <GestureHandlerRootView >
            <Swipeable renderRightActions={rightSwipe} >
                <View style={styles.item}>
                    <Image style={styles.item_left} source={{ uri: data.tourImage?.[0] }}></Image>
                    <View style={styles.item_right}>
                        <Text numberOfLines={2} style={styles.item_title}>{data.tourName}</Text>
                        <View style={styles.item_start_view}>
                            {Array.from({ length: 5 }).map((_, index) => {
                                if (index < 3) {
                                    return (
                                        <Image
                                            key={`star-${index}`}
                                            source={ICON.star_yellow}
                                            style={{ width: 15, height: 15 }}
                                        />
                                    );
                                } else {
                                    return (
                                        <Image
                                            key={`star-${index}`}
                                            source={ICON.star}
                                            style={{ width: 15, height: 15 }}
                                        />
                                    );
                                }
                            })}
                            <Text style={styles.item_start}>{data.start}</Text>
                            <Text style={styles.item_view}>{data.view}{data.rating} review</Text>
                        </View>
                        <Text style={styles.item_address}>{data.address}</Text>
                        <View style={{ flexDirection: 'column' }}>

                            <Text style={styles.item_price}>{data.adultPrice}/Người lớn </Text>
                            <Text style={styles.item_price}>{data.childrenPrice}/Trẻ em</Text>
                            {/* <Text style={styles.person}></Text> */}
                        </View>
                        <View style={styles.item_days}>
                            <Text style={styles.item_days_text}>{data.limitedDay}</Text>
                        </View>
                    </View>
                </View>

            </Swipeable >
        </GestureHandlerRootView >
    )
}


export default Item_wishlist

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        height: 158,
    },
    item_left: {
        width: 122,
        height: 122,
        borderRadius: 15
    },
    item_right: {
        width: 218,
        marginLeft: 15,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    item_title: {
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 21,
        color: '#000000'
    },
    item_start_view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_start: {
        alignItems: 'flex-start',
        marginRight: 10,
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#000000'
    },
    item_view: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#000000'

    },
    item_address: {
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 15,
        color: '#000000'
    },
    item_price: {
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 18,
        color: '#000000'
    },
    person: {
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 15,
        color: '#000000'
    },
    item_days: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 3,
        height: 25,
        justifyContent: 'center'
    },
    item_days_text: {
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 15,
        color: '#1A1A1A'
    }

})