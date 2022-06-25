import React, { useState, useEffect,} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar,
    NativeModules,
    NativeEventEmitter,
    TouchableOpacity,
    Button,
    Platform,
    PermissionsAndroid,
    FlatList,
    TouchableHighlight, 
    SectionList,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import home from './assets/images/home.png';
import medicine from './assets/images/medicine.png';
import alarm from './assets/images/alarm.png';
import care from './assets/images/care.png';
import setting from './assets/images/settings.png';

// import Medicine from './Medicine';
// import Care from './Care';
// import Setting from './Setting';
// import Home from './Calender';

import {width,height,colors} from './globalstyles';

const styles = {
    container: {
        height: height * 261,
        width: width * 1200,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'space-around',
        backgroundColor: '#FFFFFF'
    },
    menubox:{
        flex:1,
        alignItems: 'center'
    },
    imageviewactive:{
        flex:7,
        justifyContent: 'center',
    },
    imageview:{
        flex:7,
        justifyContent: 'center',
        opacity: 0.5
    },    
    homeimg:{
        marginTop:width * 40,
        resizeMode: 'contain',
        width: width * 114,
        height:width * 114,
    },
    medicineimg:{
        marginTop:width * 40,
        resizeMode: 'contain',
        width: width * 62,
        height:width * 76,
    },
    alarmimg:{
        marginTop:width * 40,
        resizeMode: 'contain',
        width: width * 114,
        height:width * 114,
    },
    careimg:{
        marginTop:width * 40,
        resizeMode: 'contain',
        width: width * 78,
        height:width * 78,
    },
    settingimg:{
        marginTop:width * 40,
        resizeMode: 'contain',
        width: width * 70,
        height:width * 70,
    },
    textview:{
        flex: 4,
    },
    text:{
        fontSize: width*36,
    },
    circleview:{
        flex:4,
    },
    chkcircle:{
        marginTop: width * 10,
        width: width * 16,
        height: width * 16,
        borderRadius: 50,
        backgroundColor:colors.blue
    }
}


function Footer({navigation, current}){
    useEffect(() =>{
        console.log(current);
    },[])
    return(
    <View>
        <Shadow
            viewStyle={{width:'100%'}}
            offset={[0, 0]}
            startColor= '#EAEAEA'>
            <View style = {styles.container}>
                <TouchableOpacity style = {styles.menubox} onPress = {()=>navigation.replace('Calender')}>
                    <View style = { current == 'home' ? styles.imageviewactive : styles.imageview}>
                        <Image style = {styles.homeimg} source = {home}/>
                    </View>
                    <View style = {styles.textview}>
                        <Text style = {styles.text}>홈</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.menubox} onPress = {()=>navigation.replace('Alarm')}>
                    <View style = {current == 'alarm' ? styles.imageviewactive : styles.imageview}>
                        <Image style = {styles.alarmimg} source = {alarm}/>
                    </View>
                    <View style = {styles.textview}>
                        <Text style = {styles.text}>알람</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Shadow>
    </View>
    
    );
}

export default Footer;