import React, { useEffect, useState } from 'react';
import {TouchableOpacity,Image, Text,View,Modal,TextInput, StyleSheet, Touchable,AsyncStorage} from 'react-native';
import {Calendar, CalendarList, Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import Footer from './Footer';
import SoundPlayer from 'react-native-sound-player';
import {Shadow} from 'react-native-shadow-2';
import speaker from './assets/images/speaker.png'
import good from './assets/images/good.png'
import soso from './assets/images/soso.png'
import bad from './assets/images/bad.png'
import {width,height,colors} from './globalstyles';

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월.', '8월', '9월.', '10월', '11월', '12월'],
  dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  today: "오늘"
};
LocaleConfig.defaultLocale = 'kr';
const morning = {"key" : "morning", "color" : "red"};
const lunch = {"key" : "lunch", "color" : "blue"};
const dinner = {"key" : "dinner", "color" : "green"};

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
      borderBottomEndRadius:30,
      height: 200 * width,
      justifyContent:'center'
    },
    calenderview:{
      flex: 25,
      width: width * 883,
      justifyContent: 'center'
    },
    calender:{
      width: width * 883,
      height: height * 1126,
      fontSize: width * 64
    },
    buttonview:{
      flex:1
    },
    button:{
      justifyContent:'center',
      alignItems: 'center',
      width: 250,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#2196f3'
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
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
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
    fontSize: width * 40,
    borderRadius: 80,
    paddingTop: 15* height,
    
    fontWeight:'500',
    paddingHorizontal: 140*width,
    borderColor: '#7BC0FF',
    borderWidth: 7 * width,
  },
  speakerimg:{
    width: width*86,
    height: width * 86
  },
  modalcontainer:{
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems:'center'
  },
  modal:{
    width: 1070*width,
    height: 1480 * height,
    marginTop:height * 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 60
  },
  alarmoffbuttonview:{
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alarmoffbutton:{
    justifyContent:'center',
    alignContent:'center',
    width:width*1070,
    height:height * 160, 
    backgroundColor: '#5294FF',
    borderRadius:30
  },
  alarmofftext:{
    textAlign: 'center',
    fontSize: width * 96,
    color: '#fff'
  },
  alarmtime:{
    flex:4,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  alarmtext:{
    flex:2,
    fontSize: width * 96
  },
  conditiontext:{
    fontSize:width*40
  },
  conditionbuttonview:{
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  conditionview:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  conditionimage:{
    
    marginTop:40*width,
    width: width * 247,
    height: width * 247,
    opacity: 0.3
  },
  conditionbuttontext:{
    
    marginTop:20*width,
    fontSize: width * 64
  },
  condition:{
    flex: 5,
    justifyContent:'center',
    alignItems:'center'    
  },
  default:{
    
    justifyContent: 'center',
    alignItems:'center'
  },
  selectedConditionImage:{
    marginTop:40*width,
    width: width * 247,
    height: width * 247,
    opacity: 1,
  }
  });


//추가 로직 필요사항 -> 일정 api로 추가, 복약 체크 dot 추가, 일정 추가 로직 필요
function Calender({navigation}){

  const morning = {key: 'morning', color: 'red'};
  const lunch = {key: 'lunch', color: 'blue'};
  const dinner = {key: 'dinner', color: 'green'};
  const [scheduleList, setScheduleList] = useState({});
  const [textInput,setTextInput] = useState(false);
  const [test2,setTest2] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [morningAlarm,setMorningAlarm] = useState();
    const [lunchAlarm,setLunchAlarm] = useState();
    const [dinnerAlarm,setDinnerAlarm] = useState(); 
    const [time,setTime]=useState(new Date());
    const [curtime,setcurTime]=useState();
    const [ringtime, setRingTime] = useState();
    const [selectCondition, setSelectCondition] = useState();
    function addSchedule(date, schedule){ 
      let tmp; 
      
      if(schedule != NaN && schedule != null){
        if(date in scheduleList){
          tmp=scheduleList;
          tmp[date].push(schedule);
          setScheduleList(tmp);
        } 
        else{
          tmp = scheduleList;
          tmp[date] = [schedule];
          setScheduleList(tmp);
        }
      }
      setTextInput(false);
    }
    function getMedicineTime(){
      if(time.getHours() + ':' +time.getMinutes() == morningAlarm)
        return '아침'
      else if(time.getHours() + ':' +time.getMinutes() == lunchAlarm)
        return '점심' 
      else
        return '저녁'
    }
    function getTime(){
      var hours ,minutes;
      if(time.getHours() < 10){
        hours = '0' + time.getHours() 
      }
      else{
        hours = time.getHours()
      }
      if(time.getMinutes() < 10){
        minutes = '0' + time.getHours() 
      }
      else{
        minutes = time.getHours()
      }
      return hours%12 + ':' + minutes
    }

    function getAmPm(){
      return time.getHours() > 11 ? 'Pm' : 'Am'
    }

    function getToday(){
      var year = time.getFullYear();
      var month = ("0" + (1 + time.getMonth())).slice(-2);
      var day = ("0" + time.getDate()).slice(-2);
    
      return year + "-" + month + "-" + day;
    }

    useEffect(()=>{
      try {
        if(modalVisible){
          AsyncStorage.getItem('volumn').then((value)=>{
            SoundPlayer.setVolume(parseInt(value))
          })
          SoundPlayer.playSoundFile('alarmm', 'mp3')
        }
        else
          SoundPlayer.stop('alarmm','mp3')
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
    },[modalVisible])


    useEffect(()=>{
      AsyncStorage.getItem('dots').then((value) =>{
        if(value == null){
          console.log(value)
          AsyncStorage.setItem('dots',JSON.stringify({"2022-06-01": {"dots": [morning, lunch, dinner]},
          "2022-06-02": {"dots": [morning, lunch, dinner]},
          "2022-06-03": {"dots": [morning, lunch, dinner]},
          "2022-06-04": {"dots": [morning, lunch]},
          "2022-06-05": {"dots": [morning, lunch, dinner]},
          "2022-06-06": {"dots": [morning, lunch, dinner]},
          "2022-06-07": {"dots": [morning, lunch, dinner]},
          "2022-06-08": {"dots": [morning, lunch, dinner]},
          "2022-06-09": {"dots": [morning, dinner]},
          "2022-06-10": {"dots": [morning, lunch, dinner]},
          "2022-06-11": {"dots": [morning, lunch, dinner]},
          "2022-06-12": {"dots": [morning, lunch, dinner]},
          "2022-06-13": {"dots": [lunch, dinner]},
          "2022-06-14": {"dots": [morning, lunch, dinner]},
          "2022-06-15": {"dots": [lunch, dinner]},
          "2022-06-16": {"dots": [morning, lunch, dinner]},
          "2022-06-17": {"dots": [morning, dinner]},
          "2022-06-18": {"dots": [morning, lunch, dinner]},
          "2022-06-19": {"dots": [morning, lunch, dinner]},
          "2022-06-20": {"dots": [morning, lunch]},
          "2022-06-21": {"dots": [morning, lunch, dinner]}}));

          setTest2({"2022-06-01": {"dots": [morning, lunch, dinner]},
          "2022-06-02": {"dots": [morning, lunch, dinner]},
          "2022-06-03": {"dots": [morning, lunch, dinner]},
          "2022-06-04": {"dots": [morning, lunch]},
          "2022-06-05": {"dots": [morning, lunch, dinner]},
          "2022-06-06": {"dots": [morning, lunch, dinner]},
          "2022-06-07": {"dots": [morning, lunch, dinner]},
          "2022-06-08": {"dots": [morning, lunch, dinner]},
          "2022-06-09": {"dots": [morning, dinner]},
          "2022-06-10": {"dots": [morning, lunch, dinner]},
          "2022-06-11": {"dots": [morning, lunch, dinner]},
          "2022-06-12": {"dots": [morning, lunch, dinner]},
          "2022-06-13": {"dots": [lunch, dinner]},
          "2022-06-14": {"dots": [morning, lunch, dinner]},
          "2022-06-15": {"dots": [lunch, dinner]},
          "2022-06-16": {"dots": [morning, lunch, dinner]},
          "2022-06-17": {"dots": [morning, dinner]},
          "2022-06-18": {"dots": [morning, lunch, dinner]},
          "2022-06-19": {"dots": [morning, lunch, dinner]},
          "2022-06-20": {"dots": [morning, lunch]},
          "2022-06-21": {"dots": [morning, lunch, dinner]}});
        }else{
          console.log(value);
          setTest2(JSON.parse(value));
        }
      })

      const id=setInterval(()=>{
        setTime(new Date());
      },1000); 
      return ()=>clearInterval(id)
    },[])

    useEffect(()=>{
      
      if(modalVisible == false && (time.getHours() + ':' +time.getMinutes() == morningAlarm || time.getHours() + ':' +time.getMinutes() == lunchAlarm || time.getHours() + ':' +time.getMinutes() == dinnerAlarm)){
        setModalVisible(true)
        setRingTime(time.getHours() + ':' + time.getMinutes());
      }
    },[time.getMinutes()])
      useEffect(()=>{
        var hour, minute
        if(time.getHours() < 10)
          hour =  '0' +  time.getHours()
        else
          hour = time.getHours()

        if(time.getMinutes() < 10)
          minute = '0'  + time.getMinutes()
        else
          minute = time.getMinutes()

        setcurTime(hour + ':' + minute)

        if(modalVisible){ 
            AsyncStorage.getItem('sensor').then((value)=>{
              if((((time.getDay() == (parseInt(value.split('=')[0]/3 + 1)) || (time.getDay() ==  (parseInt(value.split('=')[0]/3 - 6)))) && value.split('=')[1] == 1))){
                if(value.split('=')[0]%3 == 0){
                  if(ringtime == morningAlarm){
                    setModalVisible(false);
                    if(test2[getToday()] == undefined){
                      test2[getToday()] = {dots : [morning]}
                    }
                  else{
                    test2[getToday()]["dots"].push(morning)
                  }
                  AsyncStorage.setItem('dots',test2)
                  }  
                }else if(value.split('=')[0]%3 == 1){ 
                  if(ringtime == lunchAlarm){
                    setModalVisible(false);
                    if(test2[getToday()] == undefined)
                    test2[getToday()] = {dots : [lunch]}
                  else 
                    test2[getToday()]["dots"].push(lunch)
                  AsyncStorage.setItem('dots',test2)
                  }
                }else if(value.split('=')[0]%3 == 2){  
                  if(ringtime == dinnerAlarm){
                    setModalVisible(false);
                    if(test2[getToday()] == undefined)  
                      test2[getToday()] = {dots : [dinner]}
                    else
                      test2[getToday()]["dots"].push(dinner)
                    AsyncStorage.setItem('dots',test2)
                  }
                }
              }
            })
        } 
      },[time])


    useEffect(()=>{
      
      AsyncStorage.getItem('morning').then(
        (value) =>
        {
          if(value == null){
            AsyncStorage.setItem('morning','6:0');
          }
            setMorningAlarm(value)
        })
        AsyncStorage.getItem('lunch').then(
          (value) =>
          {
            
            if(value == null){
              AsyncStorage.setItem('lunch','12:0');
            }
            setLunchAlarm(value)
          })
        AsyncStorage.getItem('dinner').then(
          (value) =>
          {
              if(value == null){
                AsyncStorage.setItem('dinner','18:0');
              }
              setDinnerAlarm(value)
          })
    },[]);
    function testFunction(){
      AsyncStorage.setItem('dots',JSON.stringify({"2022-06-01": {"dots": [morning, lunch, dinner]},
      "2022-06-02": {"dots": [morning, lunch, dinner]},
      "2022-06-03": {"dots": [morning, lunch, dinner]},
      "2022-06-04": {"dots": [morning, lunch]},
      "2022-06-05": {"dots": [morning, lunch, dinner]},
      "2022-06-06": {"dots": [morning, lunch, dinner]},
      "2022-06-07": {"dots": [morning, lunch, dinner]},
      "2022-06-08": {"dots": [morning, lunch, dinner]},
      "2022-06-09": {"dots": [morning, dinner]},
      "2022-06-10": {"dots": [morning, lunch, dinner]},
      "2022-06-11": {"dots": [morning, lunch, dinner]},
      "2022-06-12": {"dots": [morning, lunch, dinner]},
      "2022-06-13": {"dots": [lunch, dinner]},
      "2022-06-14": {"dots": [morning, lunch, dinner]},
      "2022-06-15": {"dots": [lunch, dinner]},
      "2022-06-16": {"dots": [morning, lunch, dinner]},
      "2022-06-17": {"dots": [morning, dinner]},
      "2022-06-18": {"dots": [morning, lunch, dinner]},
      "2022-06-19": {"dots": [morning, lunch, dinner]},
      "2022-06-20": {"dots": [morning, lunch]},
      "2022-06-21": {"dots": [morning, lunch, dinner]}}));

      setTest2({"2022-06-01": {"dots": [morning, lunch, dinner]},
      "2022-06-02": {"dots": [morning, lunch, dinner]},
      "2022-06-03": {"dots": [morning, lunch, dinner]},
      "2022-06-04": {"dots": [morning, lunch]},
      "2022-06-05": {"dots": [morning, lunch, dinner]},
      "2022-06-06": {"dots": [morning, lunch, dinner]},
      "2022-06-07": {"dots": [morning, lunch, dinner]},
      "2022-06-08": {"dots": [morning, lunch, dinner]},
      "2022-06-09": {"dots": [morning, dinner]},
      "2022-06-10": {"dots": [morning, lunch, dinner]},
      "2022-06-11": {"dots": [morning, lunch, dinner]},
      "2022-06-12": {"dots": [morning, lunch, dinner]},
      "2022-06-13": {"dots": [lunch, dinner]},
      "2022-06-14": {"dots": [morning, lunch, dinner]},
      "2022-06-15": {"dots": [lunch, dinner]},
      "2022-06-16": {"dots": [morning, lunch, dinner]},
      "2022-06-17": {"dots": [morning, dinner]},
      "2022-06-18": {"dots": [morning, lunch, dinner]},
      "2022-06-19": {"dots": [morning, lunch, dinner]},
      "2022-06-20": {"dots": [morning, lunch]},
      "2022-06-21": {"dots": [morning, lunch, dinner]}});
    }
    return (
        <View style = {styles.container}>
        <View   style = {styles.header}>
          <Shadow
            viewStyle={{width:'100%'}}
            radius={30}
            offset={[0, 0]}
            startColor= '#EAEAEA'>
              <View style = {styles.topslider}>
                <View style={styles.speakerview}>
                  <TouchableOpacity onPress={()=>testFunction()}>
                    <Image style={styles.speakerimg} source = {speaker}/>
                  </TouchableOpacity>
                  <Text style = {styles.speakertext}>금일 약 처방 일정이 있습니다.</Text>
                </View>
              </View>
            </Shadow>
          </View>
          {/*모달창  */}
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }} >
          <View style={styles.modalcontainer}>
              <View style = {styles.modal}>
                <View style={styles.alarmtime}>
                  <Text style = {{fontSize:96*width}}>{getAmPm()}</Text>
                  <Text style = {{fontSize:300*width}}>{curtime}</Text>
                </View>

                <Text style = {styles.alarmtext}>{getMedicineTime()}약 복용 시간입니다</Text>
                
                <View style = {styles.condition}>
                  <Text style = {styles.conditiontext}>지금 당신의 컨디션은 어떠신가요?</Text>
                  <View style = {styles.conditionbuttonview}>
                    <View style = {styles.conditionview}>
                    <TouchableOpacity style={styles.default} onPress={()=> setSelectCondition("good")}>
                        <Image style = {selectCondition != "good" ? styles.conditionimage : styles.selectedConditionImage} source={good}/>
                      </TouchableOpacity>
                      <Text style = {styles.conditionbuttontext}>좋아요</Text>
                    </View>
                    <View style = {styles.conditionview}>
                      <TouchableOpacity style={styles.default} onPress={()=> setSelectCondition ("soso")}>
                        <Image style = {selectCondition != "soso" ? styles.conditionimage : styles.selectedConditionImage} source={soso}/>
                      </TouchableOpacity>
                      <Text style = {styles.conditionbuttontext}>보통이예요</Text>
                    </View>
                    <View style = {styles.conditionview}>
                    <TouchableOpacity style={styles.default} onPress={()=> setSelectCondition("bad")}>
                        <Image style = {selectCondition != "bad" ? styles.conditionimage : styles.selectedConditionImage} source={bad}/>
                      </TouchableOpacity>
                      <Text style = {styles.conditionbuttontext}>나빠요</Text>
                    </View>
                  </View>
                </View>

                <Text style = {{flex: 1, fontSize:width * 36, paddingTop:100* height}}>약 복용시 자동으로 알람이 꺼지고 1초뒤, 본 화면이 꺼집니다.</Text>
              </View>
              <View style={styles.alarmoffbuttonview}>
                <TouchableOpacity style={styles.alarmoffbutton} onPress= {()=> setModalVisible(false)}>
                  <Text style={styles.alarmofftext}>알람끄기</Text>
                </TouchableOpacity>
              </View>
          </View>
          </Modal>
          <View style = {styles.calenderview}>
          <Shadow
            viewStyle={{width:'100%'}}
            // radius={100}
            offset={[2, 2]}
            startColor= '#EAEAEA'>
            <Calendar
            markingType={'multi-dot'}
            markedDates={test2}
              style={{
                borderRadius:30,
              }}
                theme = {{
                  'stylesheet.calendar.main':{
                    container: {
                      backgroundColor: '#fff'
                    },
                    dayContainer: {
                      flex: 1,
                      alignItems: 'center'
                    },
                    monthView: {
                      borderRadius:30,
                    },
                  },
                  'stylesheet.calendar.header':{
                    header:{
                      borderTopStartRadius: 30,
                      borderTopEndRadius: 30,
                      backgroundColor:'#7BC0FF',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      // paddingLeft: 10,
                      // paddingRight: 10,
                      // marginTop: 6,
                      alignItems: 'center',
                    },
                    
                    monthText:{
                      fontSize: width * 55,
                      fontWeight: '600',
                      color:'#fff'
                    },
                    arrowImage: {
                        tintColor: 'white',
                        width : width * 100,
                        height : height * 100
                      }
                    },
                  'stylesheet.day.basic':{
                    container: {
                      borderRadius: 30,
                      // alignSelf: 'stretch',
                      alignItems: 'center'
                    },
                    base:{
                      width: width * 120,
                      height: height * 130,
                      borderRadius: 30
                    },
                  },
                  textDayFontSize: 50*width,
                  textMonthFontSize: 64*width,
                  textDayHeaderFontSize: 50*width
                }}
                onDayPress={day => {
                  // setSelectedDate(day.year + "-" + day.dateString.split('-')[1] + "-" + day.dateString.split('-')[2]);
                }}
                monthFormat={'yyyy년 MM월'}
                enableSwipeMonths={true}
              />
              </Shadow>
          </View>
          <Footer navigation = {navigation} current='home'/>
        </View>
    )
}

export default Calender;