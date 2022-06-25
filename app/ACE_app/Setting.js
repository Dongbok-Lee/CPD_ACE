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
import Footer from './Footer';

function Setting({navigation}){
    return (
        <View  style={{flex:1}}>
            <Text style={{flex:1}}>설정</Text>
            <Footer navigation = {navigation} current='setting'/>
        </View>
    )
}
export default Setting;