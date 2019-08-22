import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import { createStackNavigator } from 'react-navigation';
// CUSTOM COMPONENTS
import MatchCard from '../component/joinMatchCard';
import Header from '../component/header';
import Loading from '../component/loader';
// REDUX 
import config from '../config/config.js'
import { GetUpcoming,GetWallet } from '../redux/Actions/Actions';
import { store } from '../redux/Store';

export default class UpcomingScreen extends Component {
    constructor() {
        super();
        this.state = {
            matches: store.getState().upcoming,
            status: store.getState().upcoming.length == 0 ? false : 1,
            noMatches: store.getState().upcoming.length == 0 ? true : false,
        }
    }
    componentDidMount(){
        this._getWalletBalance(); // UPDATE WALLET BALANCE ON STORE (DRAWER PURPOSE)
        this.props.navigation.addListener('willFocus', (route) => {
            this._getUpcomingMatches()
        });        
        store.subscribe(() => {
            this.setState({
                matches: store.getState().upcoming,
                noMatches: store.getState().upcoming.length == 0 ? true : false,
            });
        });
    }
    _getWalletBalance() {
        fetch(config.domain + "api/payment.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                action: "getWallet",
                user: store.getState().user
            })

            })
            .then((response) => response.json())
            .then((data) => {
            store.dispatch(GetWallet(data.balance));
            })
            .catch((error) => {
            console.error(error);
            });
        }
    _getUpcomingMatches(){
        fetch(config.domain + "api/matches.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({action: "get_upcoming"})
        })
            .then((response) => response.json())
            .then((resJson) => {
                console.log('Fetched');
                if (resJson.length == 0) {
                    this.setState({
                        status: 1,
                    });
                } else {
                    if (store.getState().upcoming.length == 0) {
                        this.setState({
                            matches: resJson,
                            status: 1,
                            noMatches: false,
                        });
                    }
                }
                store.dispatch(GetUpcoming(resJson));
            })
            .catch((error) => {
                console.error(error);
                ToastAndroid.show('Error Updating Match list', ToastAndroid.LONG);
            });
    }
    render() {
        if (!this.state.status) {
            return(
                <Screen>
                    <Header text='Game Setter' />
                    <Loading text='Enemies Ahead'/>
                </Screen>
            );
        }
        if (this.state.noMatches == true) {
            return(
                <Screen>
                    <Header text='Game Setter' />
                    <View style={{flex:1, width: '100%',backgroundColor: '#10102d', alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
                        <Image source={require('../images/pubg-character-helmet.png')} style={{width:'50%',height: '50%',resizeMode: 'contain'}} />
                        <Text style={{fontSize:18}}>No Matches Available</Text>
                    </View>
                </Screen>
            )
        }
        
        let Match = this.state.matches.map((match, index) => {
            return (
                <MatchCard
                    key={index}
                    data={match}
                />
            );
        });
        return (
            <Screen style={{backgroundColor: '#10102d'}}>
                <Header text='Game Setter' />
                <ScrollView>
                    {Match}
                </ScrollView>
            </Screen>
        );
    }
}