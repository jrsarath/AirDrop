import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import RNRestart from 'react-native-restart';
// CUSTOM COMPONENET 
import Header from '../component/headerBack';
import Loading from '../component/loader';
// REDUX 
import { persistor, store } from '../redux/Store';

export default class LogoutScreen extends Component {
    componentDidMount() {
        persistor.purge()
            .then(RNRestart.Restart())
    }
    render() {
        return (
            <Screen>
                <Loading text='See you again'/>
            </Screen>
        );
    }
}