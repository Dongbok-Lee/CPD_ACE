import React from 'react';
import {Text,View} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

//추가 로직 필요사항 -> 일정 api로 추가, 복약 체크 dot 추가, 일정 추가 로직 필요
function Calender({navigation}) {
    return (
        <View>
            <Calendar/>
        </View>
    )
}

export default Calender;