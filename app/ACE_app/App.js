import React, { useState, useEffect,} from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
  SectionList,
} from 'react-native';
import Calender from './Calender';
// import Ble from './Ble';

function App(){

  const BleManagerModule = BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  const peripherals = new Map();
  const [list, setList] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const Stack = createNativeStackNavigator();

  function startScan(){

    if(!isScanning){
        BleManager.scan([], 3, true).then((results) =>{
            console.log('Scanning...');
            setIsScanning(true);
        }).catch(err => {
            console.error(err);
        });
    }
}

function  handleStopScan(){
    console.log('Scan is stopped');
    setIsScanning(false);
}

function handleDisconnectedPeripheral(){
    let peripheral = peripherals.get(data.peripheral);
    if(peripheral){
        peripheral.connected = false;
        peripherals.set(peripheral.id, peripheral);
        SectionList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
}

function handleUpdateValueForCharacteristic(data){
    console.log('Received data from ' + data.periperal + ' characteristic ' + data.characteristic, data.value);
}

function retrieveConnected(periperal){
    BleManager.getConnectedPeripherals([]).then((results) =>{
        if(results.length == 0){
            console.log('No connected phripherals');
        }
        console.log(results);
        for(var i = 0; i < results.length; i++){
            var peripheral = results[i];
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
        }
    });
}

function handleDiscoverPeripheral(peripheral){
    console.log('Got ble peripheral', peripheral);
    if(!peripheral.name){
        peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
}

function testPeripheral(peripheral){
    if(peripheral){
        if(peripheral.connected){
            BleManager.disconnect(peripheral.id);
        }else{
            BleManager.connect(peripheral.id).then(() =>{
                let p = peripherals.get(peripheral.id);
                if(p){
                    p.connected = true;
                    peripherals.set(peripheral.id, p);
                    setList(Array.from(peripherals.values()));
                }
                console.log('Connected to ' + peripheral.id);

                setTimeout(() => {
                    BleManager.retrieveServices(peripheral.id).then((peripheralData) =>{
                        console.log('Retrieved peripheral services', peripheralData);

                        BleManager.readRSSI(peripheral.id).then((rssi) =>{
                            console.log('Retrieved actual RSSI value', rssi);
                            let p = peripherals.get(peripheral.id);
                            if(p){
                                p.rssi = rssi;
                                peripherals.set(peripheral.id, p);
                                setList(Array.from(peripherals.values()));
                            }
                        });
                    });
                }, 900);
            }).catch((error)=>{
                console.log('Connection error', error);
            });
        }
      }
    }

  useEffect(()=>{
    BleManager.start({showAlert: false});

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
    
    if(Platform.OS === 'android' && Platform.Version >= 23){
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result)=>{
        if(result){
          console.log("Permission is OK");
        }else{
          PermissionsAndroid.request(PermissionsAndroid.PermissionAndroid.ACCESS_FINE_LOCATION).then((result) =>{
            if(result){
              console.log("User accept");
            }else{
              console.log("User refuse");
          }
        });
      }
    });
  }
  return (() => {
    console.log('unmount');
    bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
    bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
  })
},[]);

  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name = "Calender" component = {Calender}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
