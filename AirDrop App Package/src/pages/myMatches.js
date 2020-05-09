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
            results: [],
            status: false,
            noData: false
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
            body: JSON.stringify({
                action: "get_results",
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
                        results: resJson,
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
        let results = this.state.results.map((r, index) => {
            return (
                <View style={styles.tranCon} key={index}>
                    <Text>Match: {r.match_id}</Text>
                    <Text>Kills: {r.kill_count}</Text>
                    <Text>Placement: {r.placement}</Text>
                    <Text>Updated: {r.log_date}</Text>
                    <Image source={r.winner == "true" ? require('../images/trophy.png'): require('../images/headhunter.png')} style={styles.faded} />
                </View>
            );
        });
        if (!this.state.status) {
            return(
                <Screen style={{backgroundColor: '#fff'}}>
                    <Header text='My Results' />
                    <Loading text='Please Wait'/>
                </Screen>
            );
        }
        if (this.state.noData == true) {
            return(
                <Screen>
                    <Header text='My Results' />
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
                <Header text='My Results' />
                <ScrollView>
                    {results}
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
        right: 20,
        resizeMode: 'contain',
        opacity: 0.4,
        height: 110,
    }
})