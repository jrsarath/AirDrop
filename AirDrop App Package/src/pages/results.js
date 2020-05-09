import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Linking } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';
// CUSTOM COMPONENT
import Header from '../component/headerBack';
import Loading from '../component/loader';
import Chat from '../component/chatButton';
// CONFIG 
import config from '../config/config.js'

export default class ResultsScreen extends Component {
    constructor() {
        super();
        this.state = {
            matches: [],
            status: false,
            noMatch: false
        }
    }
    componentDidMount() {
        fetch(config.domain + "api/matches.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({action: "get_finished"})
        })
            .then((response) => response.json())
            .then((resJson) => {
                console.log('Fetched');
                if (resJson.length == 0){
                    this.setState({
                        status: true,
                        noMatch: true,
                    })
                } else {
                    this.setState({
                        matches: resJson,
                        status: true,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                ToastAndroid.show('Error Updating Match list', ToastAndroid.LONG);
            });
    }
    render() {
        let matches = this.state.matches.map((match, index) => {
            return (
                <View style={styles.row} key={index}>
                    <Image style={styles.img} source={require('../images/icon.png')} />
                    <Subtitle>
                        Match #{match.id}
                    </Subtitle>
                    <TouchableOpacity style={styles.btn} onPress={()=> Linking.openURL(match.livelink)}>
                        <Text style={{color:'#fff'}}>View Result</Text>
                    </TouchableOpacity>
                </View>
            );
        });
        if (!this.state.status) {
            return(
                <Screen style={{backgroundColor: '#fff'}}>
                    <Header text='Results' />
                    <Loading text='Please Wait'/>
                </Screen>
            );
        }
        if (this.state.noMatch == true) {
            return(
                <Screen>
                    <Header text='Results' />
                    <View style={{flex:1, width: '100%',backgroundColor: '#fff', alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
                        <Image source={require('../images/pubg-character-helmet.png')} style={{width:'50%',height: '50%',resizeMode: 'contain'}} />
                        <Text style={{fontSize:18}}>No Results Available</Text>
                    </View>
                </Screen>
            )
        }
        return (
            <Screen style={{backgroundColor: '#fff'}}>
                <Header text='Results' />
                <ScrollView>
                    {matches}
                </ScrollView>
                <Chat />
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        elevation: 3,
        borderRadius: 5,
        padding: 7
    },
    img: {
        width:40,
        height:40,
        resizeMode: 'contain'
    },
    btn: {
        backgroundColor: '#f44336',
        padding: 15,
        paddingVertical: 10,
        borderRadius: 5
    }
})