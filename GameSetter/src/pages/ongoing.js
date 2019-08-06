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
import UpcomingScreen from './upcoming'
import WalletScreen from './wallet'
import AccountScreen from './account'
import matchDetails from './matchDetails.js';

export class Ongoing extends Component {
    constructor() {
        super();
        this.state = {
            matches: store.getState().ongoing,
            status: store.getState().ongoing.length == 0 ? false : 1
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
            body: JSON.stringify({action: "get_ongoing"})
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
                store.dispatch(GetOngoing(resJson));
            })
            .catch((error) => {
                console.error(error);
                ToastAndroid.show('Error Updating Match list', ToastAndroid.LONG);
            });
        
        store.subscribe(() => {
            this.setState({
                matches: store.getState().ongoing
            });
        });
    }
    render() {
        let Match = this.state.matches.map((match, index) => {
            return (
                <MatchCard
                    key={index}
                    image={{ uri: match.banner, isStatic: true }}
                    matchName={'Match ' + match.id}
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
            return (
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

export const OngoingScreen = createStackNavigator({
    Ongoing: { screen: Ongoing },
    MatchDetails: { screen: matchDetails }
  },{
    initialRouteName: "Ongoing",
    headerMode: 'none'
});

export default Ongoing = createBottomTabNavigator({
        Ongoing: {
            screen: OngoingScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor, focused }: any) => (
                    <MyIcon color={tintColor} name="clock" size={28} config={IcomoonConfig} />
                ),
            }
        },
        Matches: {
            screen: UpcomingScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor, focused }: any) => (
                    <MyIcon color={tintColor} name="console" size={28} config={IcomoonConfig} />
                ),
            }
        },
        Wallet: {
            screen: WalletScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor, focused }: any) => (
                    <MyIcon color={tintColor} name="wallet" size={28} config={IcomoonConfig} />
                ),
            }
        },
        Account: {
            screen: AccountScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor, focused }: any) => (
                    <MyIcon color={tintColor} name="man" size={28} config={IcomoonConfig} />
                ),
            }
        }
    },{
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused }) => {
                const { routeName } = navigation.state;
                switch (routeName) {
                    case "Ongoing":
                        return focused ? (
                            <Text style={styles.activeTabText}>Ongoing</Text>
                        ) : null;
                        break;
                    case "Matches":
                        return focused ? (
                            <Text style={styles.activeTabText}>Play</Text>
                        ) : null;
                        break;
                    case "Wallet":
                        return focused ? (
                            <Text style={styles.activeTabText}>Wallet</Text>
                        ) : null;
                        break;
                    case "Account":
                        return focused ? (
                            <Text style={styles.activeTabText}>Account</Text>
                        ) : null;
                        break;
                    default:
                        return null;
                        break;
                }
            }
        }),
        tabBarOptions: {
            activeTintColor: '#f44336',
            inactiveTintColor: 'gray',
            style: {
                height: 60,
                paddingVertical:10
            },
            iconStyle: {
                padding:0
            }
        },
    }
);

const styles= StyleSheet.create({
    activeTabText: {
        color: '#f44336',
        textAlign: 'center',
        marginTop: 5,
        fontSize: 12,
    }
});