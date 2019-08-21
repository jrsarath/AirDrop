import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Linking } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENT
import Header from '../component/header';
import Loading from '../component/loader';
// REDUX 
var md5 = require('js-md5');
import config from '../config/config.js'
import { store } from '../redux/Store';

export default class AccountScreen extends Component{
    render(){
        return(
            <ScrollView>
                <Header />
                <View style={styles.header}>
                    <Title style={{color:'#fff'}}>{store.getState().userData.name}</Title>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#10102d',
        height: 150,
    }
});