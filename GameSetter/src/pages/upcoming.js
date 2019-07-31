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
        fetch(config.domain + "api/matches.php", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "action=get_upcoming"
        })
            .then((response) => response.json())
            .then((responseText) => {
                console.log(responseText);
                if (store.getState().upcoming.length == 0) {
                    this.setState({
                        matches: responseText,
                        status: 1
                    });
                }
                store.dispatch(GetUpcoming(responseText));
            })
            .catch((error) => {
                console.error(error);
                ToastAndroid.show('Error Updating Match list', ToastAndroid.LONG);
            });
    }
    render() {
        let Match = this.state.matches.map((match, index) => {
            //console.log(match);
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
                />
            );
        });
        if (!this.state.status) {
            return(
                <Screen>
                    <Header text='Game Setter' />
                    <Loading />
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