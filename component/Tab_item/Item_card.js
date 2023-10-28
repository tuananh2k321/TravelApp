import { Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';

const Item_card = (props) => {
    const { item, onPress, borderWidth } = props;
    var numberCard = `${item.number}`;
    var numberCardLength = numberCard.length;
    return (
        <Pressable style={{ paddingHorizontal: 15, paddingVertical: 8 }} onPress={onPress}>
            <LinearGradient start={{ x: 1.5, y: 0 }} end={{ x: 0, y: 0 }} colors={['#1F4352', '#227092',]} style={[styles.card,{borderWidth: borderWidth}]}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.groupItem}>
                    <Text style={styles.title}>Account Balance</Text>
                    <Text style={styles.money}>100.000đ</Text>
                </View>
                <View style={styles.groupItem}>
                    <Text style={styles.title}>Master Card</Text>
                    <Text style={styles.cardID}>
                        {
                            numberCardLength > 10 ? numberCard.slice(0, 3) + ' *** *** ' + numberCard.slice(-3) : numberCard
                        }
                    </Text>
                </View>
                <View style={styles.groupTwoCircle}>
                    <Text style={styles.circle1}></Text>
                    <Text style={styles.circle2}></Text>
                </View>
            </LinearGradient>
        </Pressable>

    )
}

export default Item_card

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        color: '#ffffff',
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    money: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 30,
        color: '#ffffff',
        textAlign: 'left',
    },
    cardID: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#ffffff',
        textAlign: 'left',
    },
    title: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
        color: '#ffffff',
        textAlign: 'left',
    },
    groupItem: {
        marginTop: 6
    },
    card: {
        width: '100%',
        height: 214,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 24,
        borderColor: "white",
    },
    groupTwoCircle: {
        width: '100%',
        height: 19,
        position: 'relative',
    },
    circle1: {
        position: 'absolute',
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FFFFFF47',
    },
    circle2: {
        position: 'absolute',
        right: 17,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FFFFFF47',
    },
    error: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 18,
        letterSpacing: -0.17,
        color: 'red',
        marginTop: 5
    }

})