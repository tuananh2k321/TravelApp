import { StyleSheet, Text, View,Image, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR, SIZES } from '../../constant/Themes'

const Profile = (props) => {
    const {navigation} = props;
  return (
    <ScrollView>
        <SafeAreaView style={styles.container}>
        <View style={styles.infomation}>
            <Image style={styles.image} source={require('../../assets/images/profile.png')}></Image>
            <View style={styles.info}>
                <Text style={styles.name}>Van A</Text>
                <Text style={styles.address}>Quan 8, Go Vap</Text>
            </View>
        </View>

        <View style={{width:380,height:1,backgroundColor:'rgba(0, 0, 0, 0.2)',marginTop:28}}></View>

        
            <View style={styles.profile_tab}> 
                <TouchableOpacity>
                    <View style={styles.profile_tab1}>
                        <Text style={styles.booking}>
                            Đặt trước
                        </Text>
                        <Image  source={require('../../assets/icon/icon-arrow-right.png')}></Image>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.profile_tab1,{marginTop:30}]}>
                        <Text style={styles.booking}>
                            Danh sách mong muốn
                        </Text>
                        <Image  source={require('../../assets/icon/icon-arrow-right.png')}></Image>
                    </View>
                </TouchableOpacity>
                
            </View>
        
        <View style={{width:380,height:1,backgroundColor:'rgba(0, 0, 0, 0.2)',marginTop:40}}></View>

        <View style={styles.account_setting}>
            <Text style={styles.account_setting_text}>Thiết lập tài khoản</Text>
            {/* edit profile */}
            <TouchableOpacity>
                <View style={styles.button_setting}>
                    <View style={styles.button_setting_left}>
                        <Image source={require('../../assets/icon/icon-user-circle.png')}></Image>
                        <Text style={styles.button_setting_text}>Chỉnh sửa hồ sơ</Text>
                    </View>
                    <View>
                        <Image source={require('../../assets/icon/icon-arrow-right.png')}></Image>
                    </View>
                </View>
            </TouchableOpacity>
            {/* change lauguage */}
            <TouchableOpacity>
                <View style={styles.button_setting}>
                    <View style={styles.button_setting_left}>
                        <Image source={require('../../assets/icon/icon-translate.png')}></Image>
                        <Text style={styles.button_setting_text}>Thay đổi ngôn ngữ</Text>
                    </View>
                    <View>
                        <Image source={require('../../assets/icon/icon-arrow-right.png')}></Image>
                    </View>
                </View>
            </TouchableOpacity>
            {/* color mode */}
            <TouchableOpacity>
                <View style={styles.button_setting}>
                    <View style={styles.button_setting_left}>
                        <Image source={require('../../assets/icon/icon-moon.png')}></Image>
                        <Text style={styles.button_setting_text}>Chế độ màu</Text>
                    </View>
                    <View>
                        <Image source={require('../../assets/icon/icon-arrow-right.png')}></Image>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

            {/* Derleng Legal */}
        <View style={styles.account_setting}>
            <Text style={styles.account_setting_text}>Derleng Legal</Text>
            {/* edit profile */}
            <TouchableOpacity>
                <View style={styles.button_setting_2}>
                    <View style={styles.button_setting_left}>
                        <Image source={require('../../assets/icon/icon-reader-mode.png')}></Image>
                        <Text style={styles.button_setting_text}>Điều khoản và điều kiện</Text>
                    </View>
                    
                        <Image style={{marginLeft:10,marginTop:-10}} source={require('../../assets/icon/icon-link.png')}></Image>
                    
                </View>
            </TouchableOpacity>
            {/* change lauguage */}
            <TouchableOpacity>
                <View style={styles.button_setting_2}>
                    <View style={styles.button_setting_left}>
                        <Image source={require('../../assets/icon/icon-shield.png')}></Image>
                        <Text style={styles.button_setting_text}>Chính sách bảo mật</Text>
                    </View>
                        <Image style={{marginLeft:10,marginTop:-10}} source={require('../../assets/icon/icon-link.png')}></Image>
                </View>
            </TouchableOpacity>
            
        </View>

             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={styles.button_logout}>
                        <Text style={styles.button_logout_text}>Logout</Text>
                </View>
             </TouchableOpacity>
            <View>
                <Text style={styles.version}>Verion 3.0.0</Text>
            </View>
    </SafeAreaView>
    </ScrollView>
    
  )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        padding:15,
        width:SIZES.width,
        flexDirection:'column',
        backgroundColor:COLOR.white,
        justifyContent:'center'
    },
    infomation:{
        flexDirection:'row',
        display:'flex',
        alignItems:'center',
    },
    image:{
        width:68,
        height:68
    },
    info:{
        marginLeft:24,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
    },
    name:{
        fontStyle:'normal',
        fontWeight:'600',
        fontSize:18,
        lineHeight:18,
        color:'#000000'
    },
    address:{
        fontStyle:'normal',
        fontWeight:'400',
        fontSize:12,
        lineHeight:18,
        color:'#9098B1',
        textAlign:'center',
        marginTop:10
    },
    profile_tab:{
        marginTop:30
    },
    profile_tab1:{
        justifyContent:'space-between',
        flexDirection:'row',
    },
    booking:{
        fontStyle:'normal',
        fontWeight:'400',
        fontSize:15,
        lineHeight:18,
        color:'#000000'
    },
    account_setting:{
        flexDirection:'column',
        marginTop:40,
    },
    account_setting_text:{
        fontStyle:'normal',
        fontWeight:'600',
        fontSize:18,
        lineHeight:18,
        color:'#000000'
    },
    button_setting:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.1)',
        paddingHorizontal:20,
        borderRadius:15,
        height:58,
        alignItems:'center'
    },
    button_setting_left:{
        flexDirection:'row',
    },
    button_setting_text:{
        fontStyle:'normal',
        fontWeight:'400',
        fontSize:15,
        lineHeight:18,
        color:'#000000',
        marginLeft:11
    },
    button_setting_2:{
        marginTop:20,
        flexDirection:'row',
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.1)',
        paddingHorizontal:20,
        borderRadius:15,
        height:58,
        alignItems:'center'
    },
    button_logout:{
        marginTop:40,
        borderWidth:1,
        justifyContent:'center',
        borderColor:'rgba(0, 0, 0, 0.1)',
        paddingHorizontal:20,
        borderRadius:15,
        height:58,
        alignItems:'center',
    },
    button_logout_text:{
        fontStyle:'normal',
        fontWeight:'500',
        fontSize:15,
        lineHeight:18,
        color:'#000000',
        textDecorationLine:'underline'
    },
    version:{
        fontStyle:'normal',
        fontSize:12,
        lineHeight:18,
        color:'rgba(0, 0, 0, 0.6)',
        textAlign:'center',
        marginTop:20,
        fontWeight:'400'
    }
   

})