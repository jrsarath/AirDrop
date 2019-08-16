import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENET 
import Header from '../component/headerBack';

export default class ContactScreen extends Component {
    render() {
        return (
            <Screen>
                <Header text='Contact Us' />
                <View>
                    
                </View>
            </Screen>
        );
    }
}