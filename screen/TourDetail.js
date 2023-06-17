import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { COLOR, ICON, IMAGES, SIZES } from '../constant/Themes'
import { StatusBar } from 'react-native'
import { FONTS } from '../constant/Fonts';
import { ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const PHOTO_REVIEW = [
    'https://images.unsplash.com/photo-1509233725247-49e657c54213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=449&q=80',
    'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=468&q=80'
]
const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
const TourDetail = (props) => {
    const {navigation} = props;
    const Section = ({ title, subtitle, containerStyle, children }) => {
        return (
            <View
                style={{
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

    const Divider = ({ containerStyle }) => {
        return (
            <View style={{
                height: 1,
                flex: 1,
                marginHorizontal: SIZES.padding,
                backgroundColor: 'rgba(0,0,0,0.1)',
                ...containerStyle
            }} />
        )
    }

    const ButtonText = ({ label, labelStyle, containerStyle, onPress, disabled = false }) => {
        return (
            <TouchableOpacity
                disabled={disabled}
                onPress={onPress}
                style={[{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.base,
                }, containerStyle]}>
                <Text style={[FONTS.h3, labelStyle]}>{label}</Text>
            </TouchableOpacity>
        )
    }

    const HeaderNavigation = () => {
        return (
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.icon_36}
                        source={ICON.arrow_back}
                        resizeMode='contain' />
                </TouchableOpacity>
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

    const RowStar = ({ numberOfStar }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    Array(numberOfStar).fill("").map((_, index) => {
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
                        <RowStar numberOfStar={5} />
                        <Text style={{ ...FONTS.body4, color: COLOR.white }}>. 100 đánh giá</Text>
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
                title={"Giới thiệu"}
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
                            }}>Xem tất cả</Text>
                    </TouchableOpacity>
                </Text>
            </Section>
        )
    }

    const FeaturedItem = ({ icon, title, subtitle, containerStyle }) => {
        return (
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderRadius: 15,
                    width: (SIZES.width - 2 * SIZES.padding - 10) / 2,
                    paddingVertical: 9,
                    // paddingHorizontal: 15,
                    borderColor: COLOR.lightGray2,
                    borderWidth: 1,
                    marginBottom: 10,
                }}
            >
                <Image
                    source={icon}
                    style={styles.icon_36}
                />
                <View
                    style={{
                        marginLeft: SIZES.base
                    }}
                >
                    <Text
                        style={{
                            color: COLOR.black,
                            ...FONTS.h3
                        }}>{title}</Text>
                    <Text
                        style={{
                            color: COLOR.lightGray1,
                            ...FONTS.h4
                        }}
                    >{subtitle}</Text>
                </View>
            </View>
        )
    }
    const WhatIsIncluded = () => {
        return (
            <Section
                title={"Những gì được bao gồm"}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}>
                    <FeaturedItem
                        icon={ICON.bus}
                        title={'Xe buýt'}
                        subtitle={'Di chuyển'} />
                    <FeaturedItem
                        icon={ICON.clock}
                        title={'2 ngày 1 đêm'}
                        subtitle={'Thời gian'} />
                    <FeaturedItem
                        icon={ICON.qr_code}
                        title={'TAC200812'}
                        subtitle={'Mã sản phẩm'} />
                </View>
            </Section>
        )
    }
    const WhereWillYouStay = () => {
        return (
            <Section
                title={"Bạn sẽ ở đâu"}
                subtitle={"Xem vị trí trên bản đồ"}
            >
                <View
                    style={{
                        height: 320,
                    }}>
                    <MapView
                        style={{
                            flex: 1
                        }}
                        provider='google'
                        initialRegion={{
                            latitude: 13.3628092,
                            longitude: 103.8539009,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text
                        style={{
                            color: COLOR.lightBlack1,
                            ...FONTS.body4,
                        }}>Angkor Mails Hotel</Text>
                    <Text
                        style={{
                            color: COLOR.lightBlack1,
                            ...FONTS.body4,
                        }}>NR6, Krong Siem Reap Cambodia</Text>
                </View>
            </Section>
        )
    }

    const PhotoPreview = () => {
        return (
            <>
                <View style={{
                    marginHorizontal: SIZES.padding,
                    flexDirection: 'row'
                }}>
                    <View>
                        <Image
                            source={{ uri: PHOTO_REVIEW[0] }}
                            style={{
                                width: (SIZES.width - 2 * SIZES.padding - 10) / 2,
                                height: 320 / 2,
                                resizeMode: 'cover',
                                marginBottom: 5
                            }} />
                        <Image
                            source={{ uri: PHOTO_REVIEW[1] }}
                            style={{
                                width: (SIZES.width - 2 * SIZES.padding - 10) / 2,
                                height: 320 / 2,
                                resizeMode: 'cover'
                            }} />
                    </View>
                    <View>
                        <Image
                            source={{ uri: PHOTO_REVIEW[2] }}
                            style={{
                                width: (SIZES.width - 2 * SIZES.padding - 10) / 2,
                                height: 320 + 5,
                                resizeMode: 'cover',
                                marginLeft: 5
                            }} />
                    </View>
                </View>
                <ButtonText
                    containerStyle={{
                        marginHorizontal: SIZES.padding,
                        marginBottom: 40,
                        marginTop: 20,
                        height: 42,
                        borderRadius: 6,
                        borderColor: COLOR.black,
                        alignSelf: 'flex-start',
                        borderWidth: 1
                    }}
                    labelStyle={{
                        color: COLOR.black,
                        ...FONTS.h4,
                        fontWeight: 'bold'
                    }}
                    onPress={() => console.log("show all")}
                    label={'Xem tất cả +20 ảnh'}
                />
            </>
        )
    }

    const ReviewItem = ({ userName, imageProfile, comment, containerStyle }) => {
        return (
            <View
                style={{
                    padding: 16,
                    borderRadius: 6,
                    borderColor: COLOR.lightBlack2,
                    borderWidth: 1,
                    height: 200,
                    ...containerStyle
                }}>
                {/* header profile */}
                <View
                    style={{
                        flexDirection: 'row',

                    }}>
                    <Image
                        source={imageProfile}
                        style={[styles.icon_36, { borderRadius: 36 }]}
                    />
                    <View
                        style={{
                            marginLeft: 12
                        }}>
                        <Text
                            style={{
                                color: COLOR.black,
                                ...FONTS.h3,
                                fontWeight: '600'
                            }}>{userName}</Text>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}>
                            <RowStar numberOfStar={5} />
                            <Text
                                style={{
                                    color: COLOR.black,
                                    ...FONTS.h4
                                }}>. 16/12/2021</Text>
                        </View>
                    </View>
                </View>
                {/* content */}
                <Text
                    style={{
                        marginVertical: 16,
                        color: COLOR.black,
                        ...FONTS.body4
                    }}>{comment}</Text>
                {/* footer */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        right: 16
                    }}>
                    <View>
                        <Text style={{ color: COLOR.lightBlack1, ...FONTS.h5 }}>Ngày du lịch</Text>
                        <Text style={{ color: COLOR.lightBlack1, ...FONTS.h5 }}>12/2021</Text>
                    </View>
                    <TouchableOpacity>
                        <Image style={styles.icon_24} resizeMode='contain' source={ICON.vote_up} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const Review = () => {
        return (
            <Section
                title={"Đánh giá"}
                subtitle={"4.5 (100 đánh giá)"}>
                <ReviewItem
                    comment={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim '}
                    userName={"Jack Daniel"}
                    containerStyle={{
                        marginBottom: 20
                    }}
                    imageProfile={{ uri: PROFILE_IMAGE }} />
                <ReviewItem
                    comment={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim '}
                    userName={"Jack Daniel"}
                    containerStyle={{
                        marginBottom: 20
                    }}
                    imageProfile={{ uri: PROFILE_IMAGE }} />
                <ReviewItem
                    comment={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus in pretium dignissim '}
                    userName={"Jack Daniel"}
                    containerStyle={{
                        marginBottom: 20
                    }}
                    imageProfile={{ uri: PROFILE_IMAGE }} />

                <ButtonText
                    containerStyle={{
                        alignSelf: 'flex-start',
                        height: 42,
                        borderRadius: 6,
                        borderColor: COLOR.black,
                        borderWidth: 1
                    }}
                    labelStyle={{
                        color: COLOR.black,
                        ...FONTS.h4,
                        fontWeight: 'bold'
                    }}
                    onPress={() => console.log("show all")}
                    label={'Xem tất cả +93 đánh giá'}
                />
            </Section>
        )
    }

    const FrequentlyAskItem = ({ title, subtitle, containerStyle }) => {
        return (
            <View style={containerStyle}>
                {/* title */}
                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    <Text
                        style={{
                            color: COLOR.black,
                            ...FONTS.h3,
                            fontWeight: '700'
                        }}>{title}</Text>
                    <TouchableOpacity style={{ marginLeft: 32 }}>
                        <Image
                            resizeMode='contain'
                            source={ICON.arrow_right}
                            style={styles.icon_24} />
                    </TouchableOpacity>
                </View>
                {/* subtitle */}
                <Text
                    style={{
                        color: COLOR.black,
                        ...FONTS.body5
                    }}
                >{subtitle}</Text>
            </View>
        )
    }
    const FrequentlyAsk = () => {
        return (
            <Section
                containerStyle={{
                    marginTop: 40
                }}
                title={"Mọi người thường hỏi"}
            >
                <FrequentlyAskItem
                    containerStyle={{ marginBottom: 20 }}
                    title={'Về nơi này'}
                    subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. A id diam nisl, non justo, in odio..."}
                />
                <FrequentlyAskItem
                    containerStyle={{ marginBottom: 20 }}
                    title={'Điều khoản và điều kiện'}
                    subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. A id diam nisl, non justo, in odio..."}
                />
                <FrequentlyAskItem
                    containerStyle={{ marginBottom: 20 }}
                    title={'Chính sách hủy bỏ'}
                    subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. A id diam nisl, non justo, in odio..."}
                />

            </Section>
        )
    }
    const PriceAndBook = () => {
        return (
            <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
                style={{
                    flex: 1,
                    height: 90,
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                <View style={{
                    backgroundColor: COLOR.white,
                    flex: 1,
                    height: 76,
                    paddingHorizontal: SIZES.padding,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                color: COLOR.primary,
                                ...FONTS.h5
                            }}>
                            <Text
                                style={{
                                    ...FONTS.h2,
                                }}
                            >$600</Text>
                            /Người
                        </Text>
                    </View>
                    <ButtonText
                    onPress={() => navigation.navigate('Available_Date')}
                        label={"Đặt ngay"}
                        labelStyle={{
                            color: COLOR.white,
                            ...FONTS.h3,
                            fontWeight: 'bold'
                        }}
                        containerStyle={{
                            height: 52,
                            backgroundColor: COLOR.primary,
                            borderRadius: 15,
                            flex: 1
                        }}
                    />
                </View>
            </LinearGradient>
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
                        paddingTop: STATUSBAR_HEIGHT + SIZES.base,
                        justifyContent: 'space-between'
                    }} >
                    {/* navigation */}
                    {HeaderNavigation()}
                    {/* tour name */}
                    {TourName()}
                </ImageBackground>
                {/* about */}
                {About()}
                {<Divider
                    containerStyle={{
                        marginVertical: 40,
                    }} />}
                {/* what is include */}
                <WhatIsIncluded />
                {<Divider
                    containerStyle={{
                        marginVertical: 40,
                    }} />}
                {/* where will you stay */}
                {WhereWillYouStay()}
                {<Divider
                    containerStyle={{
                        marginBottom: 40,
                        marginTop: 20
                    }} />}
                {/* photos */}
                {PhotoPreview()}
                {/* review */}
                <Review />
                {/* people frequently ask */}
                <FrequentlyAsk />
                {/* footer book me */}
                <PriceAndBook />
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
    icon_24: {
        width: 24,
        height: 24,
    },
    container: {
        flex: 1,
        backgroundColor: COLOR.white
    },
    navigationContainer: {
        flexDirection: 'row',
        marginHorizontal: SIZES.padding,
        justifyContent: 'space-between'
    }
})