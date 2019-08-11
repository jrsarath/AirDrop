import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import { createStackNavigator, createAppContainer } from 'react-navigation';
// CUSTOM COMPONENTS
import MatchCard from '../component/joinMatchCard';
import Header from '../component/header';
import Loading from '../component/loader';
// REDUX 
import config from '../config/config.js'
import { GetUpcoming } from '../redux/Actions/Actions';
import { store } from '../redux/Store';
// PAGES
import joinMatch from './joinMatch.js';


export class Upcoming extends Component {
    constructor() {
        super();
        
        this.state = {
            matches: store.getState().upcoming,
            status: store.getState().upcoming.length == 0 ? false : 1
        }
    }
    componentDidMount(){
        this.props.navigation.addListener('willFocus', (route) => {
            this._getUpcomingMatches()
        });        
        store.subscribe(() => {
            this.setState({
                matches: store.getState().upcoming
            });
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
                if (store.getState().upcoming.length == 0) {
                    this.setState({
                        matches: resJson,
                        status: 1
                    });
                }
                store.dispatch(GetUpcoming(resJson));
            })
            .catch((error) => {
                console.error(error);
                ToastAndroid.show('Error Updating Match list', ToastAndroid.LONG);
            });
    }
    render() {
        let Match = this.state.matches.map((match, index) => {
            return (
                <MatchCard
                    key={index}
                    image={{uri: match.banner, isStatic: true}}
                    matchName={'Match '+match.id}
                    time={match.matchschedule}
                    winPrize={match.winprice}
                    perKill={match.perkill}
                    entryFee={match.entryfee}
                    type={match.matchtype}
                    version={match.type}
                    map={match.map}
                    id={match.id}
                    data={match}
                />
            );
        });
        if (!this.state.status) {
            return(
                <Screen>
                    <Header text='Game Setter' />
                    <Loading text='Enemies Ahead'/>
                </Screen>
            );
        }
        return (
            <Screen>
                <Header text='Game Setter' />
                <ScrollView>
                    {Match}
                </ScrollView>
            </Screen>
        );
    }
}

export default UpcomingScreen = createStackNavigator({
    Upcoming: { screen: Upcoming },
    joinMatch: { screen: joinMatch }
  },{
    initialRouteName: "Upcoming",
    headerMode: 'none'
});
const styles = StyleSheet.create({
    activeTabText: {
        color: '#f44336',
        textAlign: 'center',
        marginTop: 5,
        fontSize: 12,
    }
});