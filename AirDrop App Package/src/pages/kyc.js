import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENET 
import Header from '../component/headerBack';
// REDUX
import config from '../config/config.js'
import { SignIn } from '../redux/Actions/Actions';
import { store } from '../redux/Store';


export default class KycScreen extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render() {
        return (
            <Screen style={{backgroundColor: '#fff'}}>
                <Header text='Complete KYC' />
                <ScrollView>
                    
                </ScrollView>
            </Screen>
        );
    }
}