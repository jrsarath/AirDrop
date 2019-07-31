import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';

export default class Header extends Component {
    render(){
        return(
            <View style={styles.header}>
                <Image style={styles.icon} source={require('../images/icon.png')} />
                <Title styleName='bold'>{this.props.text}</Title>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 55,
        backgroundColor: '#fff',
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 4,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        marginRight: 20,
        marginLeft: 20
    }
});