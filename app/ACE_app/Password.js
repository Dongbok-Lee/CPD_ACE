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
import img from './assets/images/topimg.png';
import icon from './assets/images/Remove.png';
import {width,height,colors} from './globalstyles';


const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent:'space-around',
        alignItems: 'center',
        backgroundColor:'white'
    },
    imgContainer:{
        flex: 8,
    },
    topImg:{
        marginTop: 100 * width,
        resizeMode: 'contain',
        flex: 1
    },
    passwordText:{
        flex:1,
        marginTop: 60 * width,
        fontSize: width * 36,
        color: colors.blue,
        fontWeight: '900',
    },
    passwordView:{
        flex:4,
        alignItems: 'center',
        marginBottom:50*width
    },
    numberButton:{
        flex:2,
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 100*width,
    },
    passwordInput:{
        paddingTop: 50 * width,
        flex:3,
        flexDirection: 'row'
    },
    passwordInputCircle:{
        alignItems: 'center',
        width: 127 * width,
        height: 127 * width,
        borderRadius: 50,
        backgroundColor: colors.borderGrey,
        marginHorizontal: 17.5 * width
    },
    passwordInputCircleActive:{
        alignItems: 'center',
        width: 127 * width,
        height: 127 * width,
        borderRadius: 50,
        backgroundColor: colors.lightBlue,
        marginHorizontal: 17.5 * width
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    num:{
        fontSize: 64 * width,
        textAlign: 'center',
        fontWeight: '500',
    },
    button:{
        width:'20%', 
        height: 120 * width,
    },
    paddingtop:{
        flex:1,
        paddingTop: 70 * width
    },
    iconbutton:{
        alignItems: 'center',
        justifyContent:'center',
        width:'20%', 
        height: 120 * width,
    },
    icon:{
        width: width * 85,
        height: height * 85
    }
});

const correct = '1234';
let ptext = '비밀번호를 입력하세요';
function Password({navigation}){


const [password, onChangePassword] = useState('');


useEffect(() => {
    console.log(password);
    if(password.length > 3){
        if(correct == password){
            navigation.push('Calender');
            onChangePassword('');
            ptext = '비밀번호를 입력하세요.';
            styles.passwordText = {
                flex:1,
                marginTop: 60 * width,
                fontSize: width * 36,
                color: colors.blue,
                fontWeight: '900',
            }
        }else{
            onChangePassword('');
            ptext = '비밀번호를 다시 입력하세요.';
            styles.passwordText = {
                flex:1,
                marginTop: 60 * width,
                fontSize: width * 36,
                color: colors.red,
                fontWeight: '900',
            }
        }
    }
}, [password]);


    return(
        <View style = {styles.container}>
            <View style = {styles.imgContainer}>
                <Image style = {styles.topImg} source={img}/>
            </View>
            <View style = {styles.passwordView}>
                <Text style = {styles.passwordText}>{ptext}</Text>
                <View style = {styles.passwordInput}>
                    <View className = "input1" style = {password.length < 1 ? styles.passwordInputCircle: styles.passwordInputCircleActive}/>
                    <View className = "input2" style = {password.length < 2 ? styles.passwordInputCircle: styles.passwordInputCircleActive}/>
                    <View className = "input3" style = {password.length < 3 ? styles.passwordInputCircle: styles.passwordInputCircleActive}/>
                    <View className = "input4" style = {password.length < 4 ? styles.passwordInputCircle: styles.passwordInputCircleActive}/>
                </View>
            </View>
            <View style = {styles.numberButton}>
                <TouchableOpacity style={styles.button} onPress={()=>{onChangePassword(password+1)}}> 
                    <Text style={styles.num}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{onChangePassword(password+2)}}>
                    <Text style={styles.num}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{onChangePassword(password+3)}}>
                    <Text style={styles.num}>3</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.numberButton}>
                <TouchableOpacity style={styles.button} onPress={()=>{onChangePassword(password+4)}}> 
                    <Text style={styles.num}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{onChangePassword(password+5)}}>
                    <Text style={styles.num}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{onChangePassword(password+6)}}>
                    <Text style={styles.num}>6</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.numberButton}>
                <TouchableOpacity style={styles.button} onPress={()=>{onChangePassword(password+7)}}> 
                    <Text style={styles.num}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{onChangePassword(password+8)}}>
                    <Text style={styles.num}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{onChangePassword(password+9)}}>
                    <Text style={styles.num}>9</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.numberButton}>
                <View style={styles.button}> 
                    <Text style={styles.num}></Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>{onChangePassword(password+0)}}>
                    <Text style={styles.num}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconbutton} onPress={()=>{onChangePassword(password.slice(0, -1))}}>
                    <Image source = {icon} style = {styles.icon}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Password;