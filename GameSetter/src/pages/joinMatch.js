import React, { Component } from 'react';
import {createSwitchNavigator, createStackNavigator,createAppContainer} from 'react-navigation';
// COMPONENTS
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';

export default class joinMatch extends Component {
    render(){
        return(
            <View style={styles.header}>
                <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-left" color='#fff' size={25}/>
                </TouchableOpacity>
                <Title styleName='bold' style={{color: '#fff'}}>Join Match</Title>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 55,
        backgroundColor: '#f44336',
        color:'#fff',
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    icon : {
        position: 'absolute',
        left: 20
    }
});