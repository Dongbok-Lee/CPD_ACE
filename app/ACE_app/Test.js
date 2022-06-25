import React, { useState, useEffect,useRef} from 'react';
import BleManager from 'react-native-ble-manager';
import Buffer from 'buffer';
import {width,height,colors} from './globalstyles';

import {Calendar, CalendarList, Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';

import {
    ToastAndroid,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    NativeModules,
    TouchableOpacity,
    NativeEventEmitter,
    Button,
    Platform,
    PermissionsAndroid,
    FlatList,
    TouchableHighlight,
    SectionList,
    AsyncStorage,
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'space-around',
        alignItems: 'center',
        backgroundColor:'white'
    },
    topimg:{
        resizeMode: 'contain',
        flex: 5,
    },
    buttonview:{
        flex:1
    },
    button:{
        justifyContent:'center',
        alignItems: 'center',
        marginTop:50*width,
        width: 250,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2196f3'
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
});
const BleManagerModule = BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function Test({navigation}){
    var str = '';
    const peripherals = new Map();
    const [list, setList] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [bleData, setBleData] = useState(null);

    function startScan(){

    if(!isScanning){
        BleManager.scan([], 2, true).then((results) =>{
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
    str= '';
    console.log('Received data' + data.value);
    for(var i of data.value)
        str += String.fromCharCode(i)
        AsyncStorage.setItem('sensor', str);
        AsyncStorage.getItem('sensor').then((value)=>{
            console.log(value);
        })
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
                ToastAndroid.show("성공적으로 연결되었습니다.", ToastAndroid.SHORT);
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

 //블루투스 데이터 읽기 테스트용

                        BleManager.startNotification(
                            peripheral.id,
                            "0000ffe0-0000-1000-8000-00805f9b34fb",
                            "0000ffe1-0000-1000-8000-00805f9b34fb"
                        )
                            .then(() => {
                              // Success code
                            BleManager.read(
                                peripheral.id,
                                "0000ffe0-0000-1000-8000-00805f9b34fb",
                                "0000ffe1-0000-1000-8000-00805f9b34fb"
                            )
                                .then((readData) => {
                                // Success code
                                console.log("Read: " + readData);
                                setBleData(readData);
                                const buffer = Buffer.Buffer.from(readData); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
                                const sensorData = buffer.readUInt8(1, true);
                                console.log("buffer: " + buffer);
                                console.log("readData: " + sensorData);
                                })
                                .catch((error) => {
                                    console.log(peripheral.id);
                                    console.log(error);
                                // Failure code
                                console.log(error);
                                })
                            console.log("Notification started");
                            })
                            .catch((error) => {
                              // Failure code
                            console.log(error);
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
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
                console.log("Permission is OK");
            } else {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                    console.log("User accept");
                } else {
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

    const renderItem = (item) => {
        const color = item.connected ? 'green' : '#fff';
        return (
            <TouchableHighlight onPress={() => testPeripheral(item) }>
            <View style={[styles.row, {backgroundColor: color}]}>
                <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
                <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
                <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
            </View>
            </TouchableHighlight>
            );
        }

    return (
        <View style={styles.container}>
            <Text>{peripherals}</Text>
            <View style = {styles.buttonview}>
                <TouchableOpacity style = {styles.button} onPress={() => startScan()}>
                    <Text style = {styles.text}>블루투스 스캔</Text>
                </TouchableOpacity>
                <View style = {styles.buttonview}>
                    <TouchableOpacity style = {styles.button} onPress={() => navigation.push('Calender')}>
                        <Text style = {styles.text}>달력 화면</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {(list.length == 0) &&
            <View style={{flex:1, margin: 20}}>
                <Text style={{textAlign: 'center'}}>No peripherals</Text>
            </View>
            }
            <View style={{flex:3, width: '100%'}}>
                <FlatList 
                    data={list}
                    renderItem={({ item }) => renderItem(item) }
                    keyExtractor={item => item.id}
                />    
            </View>
        </View>
    )
};
export default Test;

