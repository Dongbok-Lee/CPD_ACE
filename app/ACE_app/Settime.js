import React, { useState, useEffect,} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    NativeModules,
    NativeEventEmitter,
    Button,
    Platform,
    PermissionsAndroid,
    FlatList,
    TouchableHighlight,
    SectionList,
  } from 'react-native';


function Settime({navigation}){
    return(
            <View>
                <Text>시간 설정</Text>
            </View>
        )
}

export default Settime;