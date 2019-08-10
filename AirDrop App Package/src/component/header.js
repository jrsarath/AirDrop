import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';

export default class Header extends Component {
    render(){
        return(
            <View style={styles.header}>
                <Image style={styles.icon} source={require('../images/logo-white.png')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 55,
        width: '100%',
        backgroundColor: '#fff',
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        height: 35,
        width: 160,
        resizeMode: 'contain',
        marginLeft: 20,
    }
});