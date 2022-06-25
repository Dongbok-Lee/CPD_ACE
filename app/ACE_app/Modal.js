import React, { useState, useEffect,} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

function Modal({navigation}){
    return(
        <WebView source={{ uri: 'https://reactnative.dev/' }} />
    )
}

export default Modal