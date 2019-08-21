import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENET 
import Header from '../component/header';

export default class ReferScreen extends Component {
    render() {
        return (
            <Screen style={{backgroundColor: '#10102d'}}>
                <Header />
                <View>
                    
                </View>
            </Screen>
        );
    }
}