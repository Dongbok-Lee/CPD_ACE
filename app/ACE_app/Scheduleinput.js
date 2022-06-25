import React, { useEffect, useState } from 'react';
import {TouchableOpacity, Text,View,TextInput, StyleSheet, Touchable} from 'react-native';

function Scheduleinput(text){
    const [scheduletext, onChangeText] = React.useState("Useless Text");

    return(
        <TextInput
        style={styles.textInput}
        onChangeText={text => onChangeText(text)}
        placeholder="아무거나 입력해주세요."
        />
    )
}

export default Scheduleinput;