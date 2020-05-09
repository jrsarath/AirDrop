import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ToastAndroid, ImageBackground, RefreshControl, Dimensions, Alert } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import { createStackNavigator } from 'react-navigation';
// CUSTOM COMPONENTS
import MatchCard from '../component/joinMatchCard';
import Header from '../component/header';
import Loading from '../component/loader';
import Chat from '../component/chatButton';
// REDUX 
import config from '../config/config.js'
import { GetUpcoming,GetWallet,GetTransactions, SignIn, GetVersion} from '../redux/Actions/Actions';
import { store } from '../redux/Store';
// FRESHCHAT
import { FreshchatUser, Freshchat, FreshchatConfig } from 'react-native-freshchat-sdk';
var freshchatConfig = new FreshchatConfig('a70f2746-ef37-4cd5-817d-f4ca21903f45', 'a783605d-6c7f-458f-8cd6-1cf108e3fea4');
Freshchat.init(freshchatConfig);


export default class UpcomingScreen extends Component {
    constructor() {
        super();
        this.state = {
            firstRun: true,
            matches: store.getState().upcoming,
            status: store.getState().upcoming.length == 0 ? false : 1,
            noMatches: store.getState().upcoming.length == 0 ? true : false,
        }
    }
    componentDidMount(){
        this._checkAppVersion(); // ASK APP UPDATE
        // UPDATE WALLET BALANCE & RECORD IN INTERVAL
        setInterval(() => {
            this._getWalletBalance();
            this._getTransactions();
        }, 60000);
        // UPDATE PROFILE IN INTERVAL
        setInterval(() => {
            this._getProfile();
        }, 150000);
        /* GET CONTENT ON PAGE REFRESH
        this.props.navigation.addListener('willFocus', (route) => {
            this._getUpcomingMatches()
        });
        */        
        // STORE SUBSCRIBE
        store.subscribe(() => {
            this.setState({
                matches: store.getState().upcoming,
                noMatches: store.getState().upcoming.length == 0 ? true : false,
            });
        });

        // LIVECHAT
        var freshchatUser = new FreshchatUser();
        freshchatUser.firstName = store.getState().userData.name;
        freshchatUser.lastName = "";
        freshchatUser.email = store.getState().user;
        freshchatUser.phoneCountryCode = "+91";
        freshchatUser.phone = store.getState().userData.phone;
        Freshchat.setUser(freshchatUser, (error) => {
            console.log(error);
        });
    }
    componentWillUnmount() {
        this.messageListener();
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
                store.dispatch(GetWallet({
                    wallet: data.balance,
                    bonus: data.bonus
                }));
            })
            .catch((error) => {
                console.error(error);
            });
        }
    _getTransactions() {
        fetch(config.domain + "api/payment.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                action: "transactions",
                user: store.getState().user
            })

        })
        .then((response) => response.json())
        .then((data) => {
            store.dispatch(GetTransactions(data));
        })
        .catch((error) => {
            console.error(error);
        });
    }
    _getProfile() {
        fetch(config.domain + "api/user.php", {
                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    "Accept-Encoding": "gzip, deflate",
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    action: "profile",
                    user: store.getState().user
                })
            })
            .then((response) => response.json())
            .then((responseText) => {
                if (this.state.firstRun == true){
                    if (responseText.pVerified == 'false') {
                        this.props.navigation.navigate('Otp');
                        ToastAndroid.show('Kindly verify your mobile no', ToastAndroid.SHORT);
                    }
                    if (responseText.eVerified == 'false') {
                        Alert.alert(
                            'Email verification!',
                            "Seems like you didn't verified your email yet. Should we Resend the verification mail ?",
                            [{
                                text: "Later",
                                onPress: () => null,
                            }, {
                                text: 'Resend Link',
                                onPress: () => this._resendVerification()
                            }], {
                                cancelable: false
                            },
                        );
                    }
                }
                store.dispatch(SignIn({
                    email: store.getState().user,
                    userData: responseText
                }));
                this.setState({
                    firstRun:false
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    _getUpcomingMatches(m){
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
    _checkAppVersion(){
        fetch(config.domain + "api/extras.php", {
                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    "Accept-Encoding": "gzip, deflate",
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    action: "version"
                })
            })
            .then((response) => response.json())
            .then((responseText) => {
                if (responseText.maintenance) {
                    this.props.navigation.navigate('Offline');
                } else {
                    if (config.version != responseText.version) {
                        this.props.navigation.navigate('Update');
                    } else {
                        this._getWalletBalance(); // UPDATE WALLET BALANCE ON STORE (HEADER PURPOSE)
                        this._getProfile(); // UPDATE PROFILE
                        this._getUpcomingMatches(null) // GET MATCHES
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    _resendVerification(){
        ToastAndroid.show('Re-sending verification email', ToastAndroid.SHORT);
        fetch(config.domain + "api/user.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                action: "resend_verification",
                user: store.getState().user
            })
        }).then((response) => response.json())
        .then((e) => {
            if (e.status = 'true') {
                ToastAndroid.show('Verification Link resent to email\nRemember to check spam/junk box', ToastAndroid.SHORT);
            }
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
                <Screen style={{backgroundColor: '#10102d'}}>
                    <Header text='Game Setter' />
                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._getUpcomingMatches('refresh')} />}>
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
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._getUpcomingMatches('refresh')} />}>
                    {Match}
                </ScrollView>
                <Chat />
            </Screen>
        );
    }
}