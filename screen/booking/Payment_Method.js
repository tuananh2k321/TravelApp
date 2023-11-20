import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
const windowWidth = Dimensions.get('window').width - 90;
import AxiosIntance from '../../constant/AxiosIntance';
import { useStripe } from '@stripe/stripe-react-native';
import { useSelector } from 'react-redux';

const Payment_Method = (props) => {
    const { navigation, route } = props;
    const { id, childrenPrice, adultPrice, name, adult, children, image, tourName } = route.params;
    let price = Number(adult) * Number(adultPrice) + Number(children) * Number(childrenPrice);
    price = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    let amount = Number(adult) * Number(adultPrice) + Number(children) * Number(childrenPrice);
    let count = Number(adult) + Number(children);
    const [totalPrice, settotalPrice] = useState(amount);
    const [quantity, setQuantity] = useState(count);
    const user = useSelector((state) => state.user);
    const chooses = [
        {
            id: 1,
            name: 'Credit card/debit',
            image: 'https://firebasestorage.googleapis.com/v0/b/onlinemusic-19f2b.appspot.com/o/img_card2.png?alt=media&token=277ed116-fe33-4bf3-ae0d-b58d10cb6dd8'
        },
        {
            id: 2,
            name: 'Credit card/debit',
            image: 'https://firebasestorage.googleapis.com/v0/b/onlinemusic-19f2b.appspot.com/o/img_card1.png?alt=media&token=63ed1d35-b3de-411e-960c-52c93d79f1b6'
        },
    ]
    const [selectedRadio, setSelectedRadio] = useState(1);

    function vndToUsd(amountInVND, exchangeRate) {
        // Kiểm tra xem đầu vào có hợp lệ không
        if (isNaN(amountInVND) || isNaN(exchangeRate) || exchangeRate <= 0) {
            return "Dữ liệu không hợp lệ";
        }

        // Thực hiện phép nhân để chuyển đổi
        var amountInUSD = amountInVND / exchangeRate;

        // Làm tròn đến 2 chữ số sau dấu thập phân
        amountInUSD = Math.round(amountInUSD * 100) / 100;

        return amountInUSD;
    }

    const onBooking = async () => {
        try {
            const response = await AxiosIntance()
                .post("/booking/api/addBooking",
                    { name: name, children: children, adult: adult, totalPrice: totalPrice, user_id: user.user._id, tour_id: id });
            console.log(response);
            if (response.result == true) {
                navigation.push("Booking_Successfully");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const onCheckout = async () => {
        var exchangeRate = 24200;
        var amountInUSD = vndToUsd(totalPrice, exchangeRate);
        // 1. Create a payment intent
        const response = await AxiosIntance()
            .post("/payments/intent",
                { amount: Math.floor(amountInUSD * 100) });
        console.log(response);
        if (response.error) {
            Alert.alert("Đã xảy ra sự cố!");
            return;
        }
        // 2. Initialize the Payment sheet
        const initResponse = await initPaymentSheet({
            merchantDisplayName: "VoThanhThe.dev",
            paymentIntentClientSecret: response.paymentIntent,
        })

        if (initResponse.error) {
            console.log(initResponse.error);
            Alert.alert("Đã xảy ra sự cố!");
            return;
        }

        // 3. Present the Payment Sheet from Stripe
        const { error: paymentError } = await presentPaymentSheet();

        if (paymentError) {
            Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
            return;
        } else {
            // Alert.alert('Success', 'Your order is confirmed!');
            onBooking();
        }
        // 4. If payment ok -> create the order
        // onCreateOrder();
    };

    const onPaymentMethod = () => {
        if (selectedRadio == 1) {
            navigation.navigate('Payment', { id: id, name: name, adult: adult, children: children, totalPrice: totalPrice });
        }
        else {
            // navigation.navigate('Payment', { id: id, name: name, adult: adult, children: children, totalPrice: totalPrice });
            onCheckout();
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.groupName}>
                <Image style={styles.image} source={{ uri: image }} resizeMode='stretch' />
                <View style={{ marginStart: 10 }}>
                    <Text style={styles.name}>
                        {
                            tourName.length > 40 ? tourName.slice(0, 90) + "..." : tourName
                        }
                    </Text>
                    <Text style={styles.order}>Order number #{id}</Text>
                </View>
            </View>

            <View style={styles.groupTotalPrice}>
                <View style={styles.groupPrice}>
                    <Text style={styles.totalPrice}>Tổng tiền </Text>
                    <Text style={[styles.totalPrice, { fontSize: 10 }]}>(incl VAT)</Text>
                </View>
                <View style={styles.groupPrice}>
                    <Text style={styles.money}>{price}/</Text>
                    <Text style={[styles.money, { fontWeight: '400' }]}>{quantity}Người</Text>
                </View>

            </View>

            {
                chooses.map((item, index) => <TouchableOpacity
                    key={index}
                    style={[styles.card, { borderColor: selectedRadio == item.id ? '#000000' : '#00000026' }]} onPress={() => setSelectedRadio(item.id)}>
                    <View style={styles.groupCardLeft}>
                        <Image style={styles.imageCard} source={{ uri: item.image }} />
                        <Text style={styles.creditCard}>{item.name}</Text>
                    </View>
                    <View style={styles.radio}>
                        {
                            selectedRadio == item.id ? <View style={styles.radioBg}></View> : null
                        }
                    </View>
                </TouchableOpacity>)
            }

            <View style={styles.groupButton}>
                <TouchableOpacity style={styles.button} onPress={onPaymentMethod}>
                    <Text style={styles.textButton}>Quy trình thanh toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Payment_Method

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 15,
    },
    groupHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#ffffff',
    },
    header: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 18,
        color: '#000000',
        marginStart: 30
    },
    name: {
        width: windowWidth,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
        color: '#000000',
        textAlign: 'left',
    },
    order: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
        color: '#00000099',
        textAlign: 'left',
    },
    money: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 18,
        color: '#000000',
        textAlign: 'left',
    },
    totalPrice: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 18,
        color: '#000000',
        textAlign: 'left',
    },
    groupTotalPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#0000001A",
        marginTop: 18
    },
    button: {
        width: '100%',
        height: 52,
        borderRadius: 15,
        backgroundColor: '#0FA3E2'
    },
    textButton: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 52,
        letterSpacing: -0.17,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    groupButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 24,
        paddingVertical: 11,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    groupPrice: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    groupName: {
        flexDirection: 'row',

    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 6,
    },
    card: {
        width: '100%',
        height: 91,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#00000026',
        paddingHorizontal: 20,
        paddingVertical: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    groupCardLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    creditCard: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: '#000000',
        textAlign: 'left',
        marginStart: 20,
    },
    imageCard: {
        width: 51,
        height: 27,
        borderRadius: 3,
    },
    radio: {
        width: 20,
        height: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10

    },
    radioBg: {
        backgroundColor: 'black',
        height: 10,
        width: 10,
        borderRadius: 5,
        margin: 3

    }


})