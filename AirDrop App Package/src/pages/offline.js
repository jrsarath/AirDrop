import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Linking } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';

export default class Splash extends Component {
    render() {
        return (
            <View style={{flex:1, width: '100%',backgroundColor: '#10102d', alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
                <Image source={require('../images/help.png')} style={{width:'30%',height: '30%',resizeMode: 'contain'}} />
                <Text style={{fontSize:18, color: '#fff'}}>Under Maintenance</Text>
                <Text style={{fontSize:14, color: '#bdbdbd',marginTop:5,textAlign:'center'}}>We are currently under maintenance, sorry for the inconvenience</Text>
            </View>
        );
    }
}