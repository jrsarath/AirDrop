import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENT
import Header from '../component/header';

export default class AccountScreen extends Component {
    render() {
        return(
            <Screen>
                <Header text='Game Setter' />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Title>Under Development</Title>
                </View>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
});