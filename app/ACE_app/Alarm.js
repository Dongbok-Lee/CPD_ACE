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
    TouchableWithoutFeedback,
    Button,
    Platform,
    Pressable,
    PermissionsAndroid,
    AsyncStorage,
    FlatList,
    TouchableHighlight, 
    SectionList,
} from 'react-native';
import Footer from './Footer';
import {Shadow} from 'react-native-shadow-2';
import Slider from 'react-native-slider';
import {width,height,colors} from './globalstyles';
import uparrow from './assets/images/uparrow.png';
import downarrow from './assets/images/downarrow.png';
import novolumn from './assets/images/nov.png';
import volumnimg from './assets/images/v.png';



const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'space-around',
        alignItems: 'center',
        backgroundColor:'white'
    },
    header:{
        width:'100%',
    },
    topslider:{
        width: '100%',
        backgroundColor: '#fff',
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
        height: 200 * width,
        justifyContent:'center'
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
    },
    textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1
    },
    speakerview:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
    },
    speakertext:{
    fontSize: width * 64,
    fontWeight:'500',
    paddingHorizontal: 90*width,
    },
    timesetview:{
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: width*130
    },
    arrowImage:{
        width: width * 65,
        height: width * 65
    },
    setampm:{
        flex:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    settimedetail:{
        flex:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timesettext:{
        fontSize: width * 64,
        fontWeight: '600',
        marginVertical: width * 30
    },
    alarmcheckview:{
        width:'100%',
        height: height * 400,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff',
        borderRadius:30,
    },
    alarmchektext:{
        fontSize: width * 40,
        fontWeight: '600',
        marginVertical: width * 30
    },
    activeAlarmcheckbutton:{
        width: width * 320,
        height: height * 210,
        backgroundColor: '#5D9BFF',
        borderRadius:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alarmcheckbutton:{
        width: width * 320,
        height: height * 210,
        backgroundColor: '#D9D9D9',
        borderRadius:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeAlarmbuttontext:{
        fontSize: width * 96,
        color:'#fff',
    },
    alarmbuttontext:{
        fontSize: width * 40,
        color:'#000',
        textAlign:'center'
    },
    shadowview:{
        width:1100*width,
        borderRadius:30,
        flex: 4
    },
    volumnview:{
        flex: 3.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 120
    },
    volumnimage:{
        width:80*width,
        height:56*width,
    },
    novolumnimage:{
        width:40*width,
        height:60*width,
    },
    volumntext:{
        width: width * 1000,
        flex:1,
        fontSize: 64*width,
        paddingTop: 120*width,
        textAlign:'left'
    }
    });

function Alarm({navigation}){

    const [morningAlarm, setMorningAlarm] = useState(true);
    const [morningHour, setMorningHour] = useState('--');
    const [morningMinute, setMorningMinute] = useState('--');

    const [lunchAlarm, setlunchAlarm] = useState(true);
    const [lunchHour, setlunchHour] = useState('--');
    const [lunchMinute, setlunchMinute] = useState('--');

    const [dinnerAlarm, setDinnerAlarm] = useState(true);
    const [dinnerHour, setDinnerHour] = useState('--');
    const [dinnerMinute, setDinnerMinute] = useState('--');

    const [seletedAlarm, setSelectedAlarm] = useState();

    const [hours, sethours] = useState(0);
    const [minutes, setminutes] = useState(0);
    const [ampm, setAmPm] = useState();
    const [volumn, setVolumn] = useState('50');

    function selectAlarm(time){

        if(time == '아침'){
            setSelectedAlarm('아침');
            setMorningAlarm(!morningAlarm);

            AsyncStorage.getItem('morning').then(
                (value) =>
                    setPrevioustime(value)
            );
        }
        else if(time == '점심'){
            setSelectedAlarm('점심')
            setlunchAlarm(!lunchAlarm)
            AsyncStorage.getItem('lunch').then(
                (value) =>
                    setPrevioustime(value)
            );
        
        }
        else if(time == '저녁'){
            setSelectedAlarm('저녁')
            setDinnerAlarm(!dinnerAlarm)
            AsyncStorage.getItem('dinner').then(
                (value) =>
                    setPrevioustime(value)
            );
        
        }
        return;
    }

    function  setPrevioustime(time){
        
        console.log(time)
        if(parseInt(time.split(':')[0]) > 11){
            sethours(parseInt(time.split(':')[0])-12)
            setAmPm('오후')
        }
        else{
            sethours(parseInt(time.split(':')[0]))
            setAmPm('오전')
        }
        setminutes(parseInt(time.split(':')[1]))
        
    }

    function setAlarm(time,increase){
        if(time == 'ampm'){
            setAmPm(ampm => ampm == '오전' ? '오후' : '오전')
        }
        else if(time == 'hour'){
            if(increase == true)
                hours < 11 ? sethours(hours+1) : sethours(0)
            else
                hours  > 0 ? sethours(hours-1) : sethours(12)
        }
        else if(time == 'minute'){
            if(increase == true)
                minutes < 59 ? setminutes(minutes+1) : setminutes(0)
            else
                minutes > 0 ? setminutes(minutes-1) : setminutes(59)
        }
    }

    function saveVolumn(value){
        setVolumn(value);
        AsyncStorage.setItem('volumn',''+value)
    }
    function storeTime(){
        var plus;
        ampm == '오전' ? plus = 0 : plus = 12;
        
        if(seletedAlarm == '아침'){
            AsyncStorage.setItem('morning', hours + plus + ":" + minutes)
            console.log(ampm)
            setMorningHour(hours + plus)
            setMorningMinute(minutes)
        }
        else if(seletedAlarm == '점심'){
            AsyncStorage.setItem('lunch', hours + plus + ":" + minutes)
            setlunchHour(hours + plus)
            setlunchMinute(minutes)
        }
        else if(seletedAlarm == '저녁'){
            AsyncStorage.setItem('dinner', hours + plus + ":" + minutes)
            setDinnerHour(hours + plus)
            setDinnerMinute(minutes)
        }
    }

    function makeTimeset(hour,minute){
        let shour, sminute
        
        hour < 10 ? shour = '0' + hour : shour = hour
            
        minute < 10 ? sminute = '0' + minute : sminute = minute

        return shour + ":" + sminute;
    }
    useEffect(()=>{
        storeTime()
    }, [minutes,hours,ampm])
    

    useEffect(()=>{
        AsyncStorage.getItem('morning').then(
            (value) =>
            {
                setSelectedAlarm("아침")
                
                if(value.split(':')[0]>11){
                    sethours(parseInt(value.split(':')[0]-12))
                    setAmPm('오후')
                }else{
                    sethours(parseInt(value.split(':')[0]))
                    setAmPm('오전')
                }

                setMorningHour(value.split(':')[0])
                setMorningMinute(value.split(':')[1])
                setminutes(parseInt(value.split(':')[1]))
            }
        );
        AsyncStorage.getItem('lunch').then(
            (value) =>
            {
                setlunchHour(value.split(':')[0])
                setlunchMinute(value.split(':')[1])
            }
        );
        AsyncStorage.getItem('dinner').then(
            (value) =>
            {
                setDinnerHour(value.split(':')[0])
                setDinnerMinute(value.split(':')[1])
            }
        );

            AsyncStorage.getItem('volumn').then(
                (value) =>
                {
                    if(value != null){
                        console.log(value);
                        setVolumn(value);
                    }
                    else{
                        AsyncStorage.setItem('volumn', '50')
                    }
                })
                
        },[]);

    return (
        <View  style={styles.container}>
            <View   style = {styles.header}>
                <Shadow
                    viewStyle={{width:'100%'}}
                    radius={30}
                    offset={[5, 5]}
                    startColor= '#EAEAEA'>
                    <View style = {styles.topslider}>
                            <Text style = {styles.speakertext}>알람 설정</Text>
                    </View>
                </Shadow>
            </View>
            <View style={styles.timesetview}>
                <View style ={styles.setampm}>
                    <TouchableOpacity onPress = {()=> setAlarm('ampm',true)}>
                        <Image style={styles.arrowImage} source={uparrow} />
                    </TouchableOpacity>
                    <Text style={styles.timesettext}>{ampm}</Text>
                    <TouchableOpacity onPress = {()=> setAlarm('ampm',false)}>
                        <Image style={styles.arrowImage} source={downarrow}/>
                    </TouchableOpacity>
                </View>
                <View style ={styles.settimedetail}>
                    <TouchableOpacity onPress={()=> setAlarm('hour',true)}>
                        <Image style={styles.arrowImage} source={uparrow}/>
                    </TouchableOpacity>
                    <Text style={styles.timesettext}>{hours > 9 ? hours : '0' + hours}</Text>
                    <TouchableOpacity onPress={()=> setAlarm('hour',false)}>
                        <Image style={styles.arrowImage} source={downarrow}/>
                    </TouchableOpacity>
                </View>
                <Text style = {{flex:1, fontSize: width*64, fontWeight:'600', textAlign: 'center'}}>:</Text>
                <View style ={styles.settimedetail}>
                <TouchableOpacity onPress={()=> setAlarm('minute',true)}>
                        <Image style={styles.arrowImage} source={uparrow}/>
                    </TouchableOpacity>
                    <Text style={styles.timesettext}>{minutes > 9 ? minutes : '0'+minutes}</Text>
                    <TouchableOpacity onPress={()=>setAlarm('minute',false)}>
                        <Image style={styles.arrowImage} source={downarrow}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.shadowview}>
            <Shadow
                    viewStyle={{width:'100%'}}
                    radius={30}
                    offset={[0, 0]}
                    startColor= '#EAEAEA'>
                <View style={styles.alarmcheckview}>
                        <View style ={styles.settimedetail}>
                            <Text style={styles.alarmchektext}>아침</Text>
                            <Pressable style={morningAlarm ? styles.activeAlarmcheckbutton :  styles.alarmcheckbutton} onPress = {()=>selectAlarm('아침')}>
                                <Text style={morningAlarm ? styles.activeAlarmbuttontext : styles.alarmbuttontext}>{morningAlarm ? makeTimeset(morningHour,morningMinute) : '알람을\n 설정해주세요'}</Text>
                            </Pressable>
                        </View>
                        <View style ={styles.settimedetail}>
                            <Text style={styles.alarmchektext}>점심</Text>
                            <Pressable style={lunchAlarm ? styles.activeAlarmcheckbutton :  styles.alarmcheckbutton} onPress = {()=>selectAlarm('점심')}>
                                <Text style={lunchAlarm ? styles.activeAlarmbuttontext : styles.alarmbuttontext}>{lunchAlarm? makeTimeset(lunchHour,lunchMinute) : '알람을\n 설정해주세요'}</Text>
                            </Pressable>
                        </View>
                        <View style ={styles.settimedetail}>
                            <Text style={styles.alarmchektext}>저녁</Text>
                            <Pressable style={dinnerAlarm ? styles.activeAlarmcheckbutton :  styles.alarmcheckbutton}  onPress = {()=>selectAlarm('저녁')}>
                                <Text style={dinnerAlarm ? styles.activeAlarmbuttontext : styles.alarmbuttontext}>{dinnerAlarm? makeTimeset(dinnerHour,dinnerMinute) : '알람을\n 설정해주세요'}</Text>
                            </Pressable>
                    </View>
                </View>
                </Shadow>
            </View>
            <Text style={styles.volumntext}>소리 설정</Text>
            <View style={styles.volumnview}>
                <Image style={styles.novolumnimage} source={novolumn}/>
                <Slider
                style={{width: 700 * width, height:20 * height, marginHorizontal: width*50 }}
                onValueChange={(value) =>saveVolumn(value)}
                minimumValue={0}
                value = {parseInt(volumn)}
                maximumValue={100}
                minimumTrackTintColor="#5D9BFF"
                maximumTrackTintColor="#D9D9D9"
                thumbTintColor=	"#5D9BFF"
                ></Slider>
                <Image style={styles.volumnimage} source={volumnimg}/>
            </View>           
            <Footer navigation = {navigation} current='alarm'/>
        </View>
    )
}
export default Alarm;