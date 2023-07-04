import { SafeAreaView, StyleSheet, Text, View,Image, TouchableOpacity, TextInput, ScrollView,Button } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLOR, SIZES } from '../../../constant/Themes'

const EditProfile = () => {
  return (
    <ScrollView>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Entypo name='chevron-small-left' size={30} color={COLOR.black}/>
                <Text style={{marginLeft:20,fontSize:18,fontWeight:'600',color:'#000000'}}>Edit Profile</Text>
            </View>
            <View style={styles.image}>
            <Image style={{width:120,height:120,borderWidth:3,borderColor:'#0FA3E2',borderRadius:100}} source={require('../../../assets/images/profile.png')}></Image>
            <TouchableOpacity style={styles.settings}>
                    <Feather style={{position:'absolute'}} name='camera' size={25} color={COLOR.white}/>
            </TouchableOpacity>
            </View>
            <View style={{height:68,marginTop:40}}>
                <Text style={{fontSize:16,color:COLOR.black}}>First name</Text>
                <TextInput style={{height:52,borderWidth:1,borderRadius:15,paddingVertical:10,paddingLeft:15,fontSize:16,color:COLOR.black}} placeholder='John'/>
            </View>
            <View style={{height:68,marginTop:12}}>
                <Text style={{fontSize:16,color:COLOR.black}}>Last name</Text>
                <TextInput style={{height:52,borderWidth:1,borderRadius:15,paddingVertical:10,paddingLeft:15,fontSize:16,color:COLOR.black}} placeholder='ABC'/>
                
            </View>
            <View style={{height:68,marginTop:12}}>
                <Text style={{fontSize:16,color:COLOR.black}}>Phone</Text>
                <TextInput style={{height:52,borderWidth:1,borderRadius:15,paddingVertical:10,paddingLeft:15,fontSize:16,color:COLOR.black}} placeholder='12939219'/>
            </View>
            <View style={{height:68,marginTop:12}}>
                <Text style={{fontSize:16,color:COLOR.black}}>Birthday</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput style={{width:'100%',height:52,borderWidth:1,borderRadius:15,paddingVertical:10,paddingLeft:15,fontSize:16,color:COLOR.black}} placeholder='John'/>
                <TouchableOpacity style={{position:'absolute',right:0,paddingRight:15}}><AntDesign name='calendar' size={30} color={COLOR.black} /></TouchableOpacity>
            </View>
            
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginTop:28,marginBottom:20}}>
                <TouchableOpacity style={{width:120,height:50,backgroundColor:'#DDDDDD',alignItems:'center',justifyContent:'center',borderRadius:15}}>
                    <Text  style={{fontWeight:'500',fontSize:18,color:'#797979'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:120,height:50,backgroundColor:'#0FA3E2',alignItems:'center',justifyContent:'center',borderRadius:15}}>
                    <Text  style={{fontWeight:'500',fontSize:18,color:'#ffffff'}}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </ScrollView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    container:{
        padding:15,
        width:SIZES.width,
        flexDirection:'column',
        backgroundColor:COLOR.white,
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
    },
    image:{
        width:120,
        height:120,
        justifyContent:'center',
        alignItems:'center',
        marginTop:35,
        marginLeft:130
    },
    settings:{
        backgroundColor:'#0FA3E2',
        width:40,
        height:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        right:0
    }
})