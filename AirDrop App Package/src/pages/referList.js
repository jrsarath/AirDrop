import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Linking, Dimensions } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';
// CUSTOM COMPONENT
import Header from '../component/headerBack';
import Loading from '../component/loader';
import Chat from '../component/chatButton';
// CONFIG 
import config from '../config/config.js';
import { store } from '../redux/Store';

export default class ReferredScreen extends Component {
    constructor() {
        super();
        this.state = {
            refers: [],
            status: false,
            noData: false
        }
    }
    componentDidMount() {
        fetch(config.domain + "api/user.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                action: "get_refers",
                user: store.getState().user
            })
        })
            .then((response) => response.json())
            .then((resJson) => {
                console.log('Fetched');
                if (resJson.length == 0){
                    this.setState({
                        status: true,
                        noData: true,
                    })
                } else {
                    this.setState({
                        refers: resJson,
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
        let refers = this.state.refers.map((r, index) => {
            return (
                <View style={styles.tranCon} key={index}>
                    <Text style={{zIndex:2}}>Name: {r.name}</Text>
                    <Text style={{zIndex:2}}>Email: {r.email}</Text>
                    <Text style={{zIndex:2}}>Gamertag: {r.gamertag}</Text>
                    <Text style={{zIndex:2}}>Date: {r.signup}</Text>
                    <Image source={require('../images/friendship.png')} style={styles.faded} />
                </View>
            );
        });
        if (!this.state.status) {
            return(
                <Screen style={{backgroundColor: '#fff'}}>
                    <Header text='My Referrals' />
                    <Loading text='Please Wait'/>
                </Screen>
            );
        }
        if (this.state.noData == true) {
            return(
                <Screen>
                    <Header text='My Referrals' />
                    <View style={{flex:1, width: '100%',backgroundColor: '#fff', alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
                        <Image source={require('../images/pubg-character-helmet.png')} style={{width:'50%',height: '50%',resizeMode: 'contain'}} />
                        <Text style={{fontSize:18}}>No Data Available</Text>
                    </View>
                    <Chat />
                </Screen>
            )
        }
        return (
            <Screen style={{backgroundColor: '#fff'}}>
                <Header text='My Referrals' />
                <ScrollView>
                    {refers}
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
    },
    tranCon: { 
        borderRadius: 5,
        // flexDirection: 'row
        // flexWrap: 'wrap',
        // alignItems: 'center',
        backgroundColor: '#fff',
        margin:5,
        marginHorizontal: 10,
        padding: 20,
        elevation: 3
    },
    iconRight: {
        position: 'absolute',
        right: 10
    },
    faded: {
        position: 'absolute',
        right: 10,
        resizeMode: 'contain',
        opacity: 0.1,
        height: 110,
        zIndex: 0
        //width: Dimensions.get('window').width,
    }
})