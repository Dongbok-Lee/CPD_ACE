import React, { useState, useEffect,} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import BleManager from 'react-native-ble-manager';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
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
import Calender from './Calender';
import Setting from './Setting';
import Settime from './Settime';
import Test from './Test';
import Password from './Password';
import Footer from './Footer';
import Alarm from './Alarm';

function App(){

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = "Test" component = {Test}/>
        <Stack.Screen name = "Password" component = {Password} />
        <Stack.Screen name = "Calender" component = {Calender}/>
        <Stack.Screen name = "Settime" component = {Settime}/>
        <Stack.Screen name = "Setting" component = {Setting}/>
        <Stack.Screen name = "Alarm" component = {Alarm}/>
        <Stack.Screen name = "Footer" component = {Footer}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
