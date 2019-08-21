import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENTS
import MatchCard from '../component/ongoingMatchCard';
import Header from '../component/header';
import Loading from '../component/loader';
// REDUX 
import config from '../config/config.js'
import { GetOngoing } from '../redux/Actions/Actions';
import { store } from '../redux/Store';
// PAGES
import matchDetails from './matchDetails';

export class OngoingView extends Component {
    constructor() {
        super();
        this.state = {
            matches: store.getState().ongoing,
            status: store.getState().ongoing.length == 0 ? false : 1,
            noMatches: store.getState().ongoing.length == 0 ? true : false,
        }
    }
    componentDidMount() {
        this.props.navigation.addListener('willFocus', (route) => {
            this._getOngoingMatches()
        });
        store.subscribe(() => {
            this.setState({
                matches: store.getState().ongoing,
                noMatches: store.getState().ongoing.length == 0 ? true : false,
            });
        });
    }
    _getOngoingMatches(){
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
            })
            .catch((error) => {
                console.error(error);
                ToastAndroid.show('Error Updating Match list', ToastAndroid.LONG);
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
            <Screen>
                <Header text='Game Setter' />
                <ScrollView>
                    {Match}
                </ScrollView>
            </Screen>
        );
    }
}
export default OngoingScreen = createStackNavigator({
    Ongoing: { screen: OngoingView },
    MatchDetails: { screen: matchDetails }
  },{
    initialRouteName: "Ongoing",
    headerMode: 'none'
});