import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, RefreshControl } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENTS
import MatchCard from '../component/ongoingMatchCard';
import Header from '../component/header';
import Loading from '../component/loader';
import Chat from '../component/chatButton';
// REDUX 
import config from '../config/config.js'
import { GetOngoing } from '../redux/Actions/Actions';
import { store } from '../redux/Store';

export default class OngoingScreen extends Component {
    constructor() {
        super();
        this.state = {
            refreshing: false,
            matches: store.getState().ongoing,
            status: store.getState().ongoing.length == 0 ? false : 1,
            noMatches: store.getState().ongoing.length == 0 ? true : false,
        }
    }
    componentDidMount() {
        /* GET CONTENT ON PAGE REFRESH
        this.props.navigation.addListener('willFocus', (route) => {
            this._getOngoingMatches()
        });
        */

        this._getOngoingMatches(null); // GET MATCHES
        // STORE SUBSCRIBE
        store.subscribe(() => {
            this.setState({
                matches: store.getState().ongoing,
                noMatches: store.getState().ongoing.length == 0 ? true : false,
            });
        });
    }
    _getOngoingMatches(m){
        if(m == 'refresh'){
            this.setState({refreshing:true})
        }
        fetch(config.domain + "api/matches.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                action: "get_ongoing",
                user: store.getState().user
            })
        })
            .then((response) => response.json())
            .then((resJson) => {
                console.log('Fetched');
                if (resJson.length == 0) {
                    this.setState({
                        status: 1,
                    });
                } else {
                    if (store.getState().ongoing.length == 0) {
                        this.setState({
                            matches: resJson,
                            status: 1,
                            noMatches:false,
                        });
                    }
                }
                store.dispatch(GetOngoing(resJson));
                if(m == 'refresh'){
                    this.setState({refreshing:false})
                }
            })
            .catch((error) => {
                console.error(error);
                ToastAndroid.show('Error Updating Match list', ToastAndroid.LONG);
                if(m == 'refresh'){
                    this.setState({refreshing:false})
                }
            });
    }
    
    render() {
        if (!this.state.status) {
            return (
                <Screen>
                    <Header text='Game Setter' />
                    <Loading text='Prepare for the Battle' />
                </Screen>
            );
        }
        if (this.state.noMatches == true ) {
            return(
                <Screen style={{backgroundColor: '#10102d'}}>
                    <Header text='Game Setter' />
                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._getOngoingMatches('refresh')} />}>
                        <View style={{flex:1, width: '100%',height: 400 ,backgroundColor: '#10102d', alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
                            <Image source={require('../images/pubg-character-helmet.png')} style={{width:'50%',height: '50%',resizeMode: 'contain'}} />
                            <Text style={{fontSize:18,marginTop:20}}>No Matches Available</Text>
                        </View>
                    </ScrollView>
                    <Chat />
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
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._getOngoingMatches('refresh')} />}>
                    {Match}
                </ScrollView>
                <Chat />
            </Screen>
        );
    }
}