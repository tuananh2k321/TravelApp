import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { COLOR, ICON, IMAGES, SIZES } from '../constant/Themes'
import { StatusBar } from 'react-native'
import { FONTS } from '../constant/Fonts';
import { ScrollView } from 'react-native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const TourDetail = () => {
    const Section = ({ title, subtitle, containerStyle, children }) => {
        return (
            <View
                style={{
                    marginBottom: 40,
                    marginHorizontal: SIZES.padding,
                    ...containerStyle
                }}>
                <View>
                    <Text
                        style={{
                            color: COLOR.black,
                            ...FONTS.h2,
                            fontSize: 20
                        }}>{title}</Text>
                    <Text
                        style={{
                            color: COLOR.lightBlack1,
                            ...FONTS.body4,
                            marginBottom: subtitle ? 20 : 0
                        }}>{subtitle}</Text>
                </View>
                {children}
            </View>
        )
    }
    const HeaderNavigation = () => {
        return (
            <View style={styles.navigationContainer}>
                <Image
                    style={styles.icon_36}
                    source={ICON.arrow_back}
                    resizeMode='contain' />
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                    <Image
                        style={styles.icon_36}
                        source={ICON.share}
                        resizeMode='contain' />
                    <Image
                        style={[styles.icon_36, { marginLeft: SIZES.base }]}
                        source={ICON.saved_product}
                        resizeMode='contain' />
                </View>
            </View>
        )
    }

    const TourName = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginHorizontal: SIZES.padding,
                    marginVertical: 16
                }}>
                {/* box name */}
                <View>
                    <Text style={{ ...FONTS.h2, color: COLOR.white }}>Koh Rong Samloem</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            Array(5).fill("").map((_, index) => {
                                return (
                                    <Image
                                        key={index}
                                        source={ICON.star_yellow}
                                        style={{
                                            width: 12,
                                            height: 12,
                                            marginRight: index != 4 ? SIZES.base / 2 : 0
                                        }}
                                    />
                                )
                            })
                        }
                        <Text style={{ ...FONTS.body4, color: COLOR.white }}>. 100 reviews</Text>
                    </View>
                </View>
                {/* box number of image */}
                <View
                    style={{
                        paddingHorizontal: SIZES.base,
                        paddingVertical: SIZES.padding / 2,
                        backgroundColor: COLOR.lightGray1,
                        borderRadius: 6
                    }}>
                    <Text style={{ ...FONTS.h3, color: COLOR.white, fontWeight: 'bold' }}>1/100</Text>
                </View>
            </View>
        )
    }

    const About = () => {
        return (
            <Section
                containerStyle={{
                    marginTop: 20,
                }}
                title={"About"}
            >
                <Text
                    style={{
                        color: COLOR.black,
                        ...FONTS.body4,

                    }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis condimentum morbi non egestas enim amet sagittis. Proin sed aliquet rhoncus ut pellentesque ullamcorper sit eget ac.Sit nisi, cras amet varius eget egestas pellentesque. Cursus gravida euismod non...
                    <TouchableOpacity >
                        <Text
                            style={{
                                marginBottom: -4,
                                textDecorationLine: 'underline',
                                color: COLOR.black,
                                ...FONTS.body4,
                                fontWeight: 'bold',
                            }}>Read all</Text>
                    </TouchableOpacity>
                </Text>
            </Section>
        )
    }

    const WhereWillYouStay = () => {
        return (
            <Section
                title={"Where Will You Stay"}
                subtitle={"View the location on map"}
            >

            </Section>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'light-content'} translucent backgroundColor={'transparent'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* header background */}
                <ImageBackground
                    source={IMAGES.tour_detail_bg}
                    resizeMode='cover'
                    style={{
                        width: SIZES.width,
                        height: 350,
                        paddingTop: STATUSBAR_HEIGHT,
                        justifyContent: 'space-between'
                    }} >
                    {/* navigation */}
                    {HeaderNavigation()}
                    {/* tour name */}
                    {TourName()}
                </ImageBackground>
                {/* about */}
                {About()}
                {/* where will you stay */}
                {WhereWillYouStay()}
                {/* review */}
                {/* people frequently ask */}
                {/* footer book me */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default TourDetail

const styles = StyleSheet.create({
    icon_36: {
        width: 36,
        height: 36,
    },
    container: {
        flex: 1,
    },
    navigationContainer: {
        flexDirection: 'row',
        marginHorizontal: SIZES.padding,
        justifyContent: 'space-between'
    }
})