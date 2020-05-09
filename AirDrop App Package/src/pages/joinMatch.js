import React, { Component } from 'react';
// COMPONENTS
import { StatusBar, Text, StyleSheet, Image, TouchableOpacity, View, ScrollView, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Subtitle, Caption, Screen } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';
// REDUX
import config from '../config/config';
import { store } from '../redux/Store';
import { GetWallet } from '../redux/Actions/Actions';
// CUSTOM COMPONENTS
import Header from '../component/headerBack';
import Chat from '../component/chatButton';
// FIREBASE
import firebase from 'react-native-firebase';

export default class joinMatch extends Component {
    constructor(props){
        super(props);
        this.state = {
            gamertag: 'null',
            button: +this.props.navigation.state.params.data.totalplayer <= +this.props.navigation.state.params.data.totalplayerjoined ? "Match Full":"Join Now (" + (+this.props.navigation.state.params.data.totalplayer - +this.props.navigation.state.params.data.totalplayerjoined) + " Left)",
            color: +this.props.navigation.state.params.data.totalplayer <= +this.props.navigation.state.params.data.totalplayerjoined ? '#bdbdbd':'#f44336',
            action: () => +this.props.navigation.state.params.data.totalplayer <= +this.props.navigation.state.params.data.totalplayerjoined ? null : this.joinMatch(this.props.navigation.state.params.data.id, this.props.navigation.state.params.data.entryfee)
        }
    }
    componentDidMount(){
        this._joinStatus();
    }
    joinMatch(id, entry){
        if (this.state.gamertag != '') {
            this.setState({
                button: "Please Wait..",
                color: '#bdbdbd'
            })
            fetch(config.domain + "api/matches.php", {
                    method: 'POST',
                    headers: new Headers({
                        'Accept': 'application/json',
                        "Accept-Encoding": "gzip, deflate",
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        action: "join_match",
                        user: store.getState().user,
                        match_id: id,
                        entryfee: entry,
                        gamertag: this.state.gamertag
                    })
                })
                .then((response) => response.json())
                .then((resJson) => {
                    if (resJson.status == 'success') {
                        this.setState({
                            button: "Joined",
                            color: '#4caf50',
                            action: null
                        })
                        firebase.messaging().subscribeToTopic('match_'+id);
                        this._getWalletBalance();
                    } else if (resJson.status == 'duplicate') {
                        this.setState({
                            button: "Already Joined",
                            color: '#bdbdbd',
                            action: null
                        })
                    } else {
                        ToastAndroid.show('Error Joining Match, Try Again Later', ToastAndroid.SHORT);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    ToastAndroid.show('Error Joining Match, Try Again Later', ToastAndroid.SHORT);
                });
        } else {
            this.setState({
                button: "Join Now (" + (+this.props.navigation.state.params.data.totalplayer - +this.props.navigation.state.params.data.totalplayerjoined) + " Left)",
                color: '#f44336',
            })
        }
    }
    _getWalletBalance(){
        if (this.state.loading == false) {
            ToastAndroid.show('Refreshing Wallet', ToastAndroid.SHORT);
        }
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
            this.setState({
                loading: false,
            });
            store.dispatch(GetWallet({
                wallet: data.balance,
                bonus: data.bonus
            }));
        })
        .catch((error) => {
            console.error(error);
            ToastAndroid.show('Error Fetching Wallet & Balance', ToastAndroid.LONG);
        });
    }
    _joinStatus(){
        fetch(config.domain + "api/matches.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                action: "join_status",
                user: store.getState().user,
                match_id: this.props.navigation.state.params.data.id
            })
        })
            .then((response) => response.json())
            .then((resJson) => {
                if (resJson.status == 'joined') {
                    this.setState({
                        button: "Already Joined",
                        color: '#bdbdbd',
                        action: null
                    })
                }
            })
            .catch((error) => {
                console.error(error);
                ToastAndroid.show('Network Error, Try Again Later', ToastAndroid.SHORT);
            });
    }
    render(){
        const { navigation } = this.props;
        const data = navigation.getParam("data");
        const time = data.matchschedule.split(' ')[1]+" "+data.matchschedule.split(' ')[2];
        const date = data.matchschedule.split(' ')[0].split('/')[1]+"/"+data.matchschedule.split(' ')[0].split('/')[0]+"/"+data.matchschedule.split(' ')[0].split('/')[2];
        return(
            <Screen style={{backgroundColor: '#fff'}}>
                <Header text='Match Details' />
                <ScrollView>
                    <Image source={{uri: data.banner, isStatic: true}} style={styles.imgBg} />
                    <View style={styles.container}>
                        <View>
                            <Title style={{fontWeight:'bold'}}>Match #{data.id}</Title>
                            <Subtitle>Date: {data.matchschedule}</Subtitle>
                        </View>
                        <Title style={styles.subText}>Match Details:</Title>
                        <View style={styles.items}>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Type: {data.matchtype}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Mode: {data.type}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Map: {data.map}</Text>
                            </View>
                        </View>

                        <Title style={styles.subText}>Prize Details:</Title>
                        <View style={styles.items}>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Per Kill: ₹{data.perkill} </Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Win: ₹{data.winprice}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Entry Fee: ₹{data.entryfee}</Text>
                            </View>
                        </View>

                        <Title style={styles.subText}>Rules:</Title>
                        <View>
                            <Text style={{marginHorizontal: 20,color: '#212121'}}>{data.rule}</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={[styles.button,{backgroundColor: this.state.color}]} onPress={this.state.action}>
                    <Text style={{color: '#fff',fontSize: 18}}>{this.state.button}</Text>
                </TouchableOpacity>
                <Chat />
            </Screen>

        );
    }
}

const styles = StyleSheet.create({
    imgBg: {
        width: '100%',
        resizeMode: 'cover',
        height: 200,
    },
    container: {
        backgroundColor: '#fff',
        padding: 20,
        flex: 1
    },
    subText: {
        marginVertical: 3,
        color: '#f44336'
    },
    items: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 5,
        elevation: 3
    },
    gridText: {
        color: '#212121',
    },
    
    button: {
        bottom: 0,
        color: '#ffffff',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        height: 50,
        width: '100%',
        
    }
});