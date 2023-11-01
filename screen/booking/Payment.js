import { StyleSheet, Text, View, ToastAndroid, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import Item_card from '../../component/Tab_item/Item_card';
import AxiosIntance from '../../constant/AxiosIntance';
import Loading from '../Loading';

const Payment = (props) => {
  const { navigation, route } = props;
  const { id, name, adult, children, totalPrice } = route.params;
  const [dataCards, setDataCards] = useState([]);
  //use state
  const [selectedId, setSelectedId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const getNews = async () => {
      const response = await AxiosIntance().get("/cart/api/getListCart?userID=" + user.user._id);
      console.log(response);
      setDataCards(response.cart);
      setIsLoading(false);
    }
    getNews();
    return () => {

    }
  }, []);

  const onDeleteCard = (cardID) => {
    return Alert.alert(
      "Gỡ thẻ?",
      "Bạn có chắc chắn muốn gỡ thẻ này không?",
      [
        // The "Yes" button
        {
          text: "Có",
          onPress: async () => {
            const response = await AxiosIntance().delete("/cart/api/deleteCart/" + cardID);
            navigation.push("Payment", { id: id, name: name, adult: adult, children: children, totalPrice: totalPrice });
          }

        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Không",
        },
      ]
    );
  };
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

  const isValidOK = () => selectedId.length > 0
  const renderItem = ({ item }) => {
    const borderWidth = item._id === selectedId ? 10 : 0;
    return (
      <Item_card
        item={item}
        onPress={() => setSelectedId(item._id)}
        borderWidth={borderWidth} />
    );
  };
  return (
    <>
      {
        isLoading == true ?
          (Loading) :
          (
            <View style={styles.container}>
              <View style={styles.groupHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={20} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.header}>Sự chi trả</Text>
              </View>
              <SwipeListView
                contentContainerStyle={{ flex: 8 }}
                data={dataCards}
                renderItem={renderItem}
                renderHiddenItem={({ item }) => (
                  <TouchableOpacity onPress={() => { onDeleteCard(item._id) }}
                    style={{ position: "absolute", left: 15, right: 15, top: 8, backgroundColor: "#0A7BAB", height: 214, borderRadius: 12, justifyContent: "center", alignItems: "flex-end", padding: 20 }}>
                    <Ionicons name="trash" size={40} color="#fff" />
                  </TouchableOpacity>
                )}
                rightOpenValue={-75}
                keyExtractor={item => item._id}
                extraData={selectedId}
              />
              <View style={styles.groupButton}>
                <TouchableOpacity style={[styles.button, { backgroundColor: isValidOK() == true ? '#0FA3E2' : 'gray' }]}
                  disabled={isValidOK() == false}
                  onPress={onBooking}>
                  <Text style={styles.textButton}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.push("AddCard", { id: id, name: name, adult: adult, children: children, totalPrice: totalPrice })}
                style={{ position: "absolute", bottom: 100, right: 20, width: 70, height: 70, backgroundColor: "#0A7BAB", borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                <Ionicons name="card" size={30} color="#ffffff" />
              </TouchableOpacity>
            </View>
          )
      }

    </>

  )
}

export default Payment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
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
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: '#ffffff',
    textAlign: 'left',
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
    marginTop: 24,
    padding: 24,
    marginBottom: 25
  },
  lable: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.17,
    color: '#000000CC',
  },
  input: {
    width: '100%',
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#0000001A',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  groupForm: {
    marginTop: 15
  },
  button: {
    width: "100%",
    height: 52,
    borderRadius: 15,
    backgroundColor: '#0FA3E2'
  },
  textButton: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 52,
    letterSpacing: -0.17,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
    letterSpacing: -0.17,
    color: '#0A7BAB',
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