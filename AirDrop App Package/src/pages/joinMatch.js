import React, { Component } from 'react';
import {createSwitchNavigator, createStackNavigator,createAppContainer} from 'react-navigation';
// COMPONENTS
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';
// REDUX
import config from '../config/config';
import { store } from '../redux/Store';

export default class joinMatch extends Component {
    constructor(props){
        super(props);
        this.state = {
            button: +this.props.navigation.state.params.data.totalplayer == +this.props.navigation.state.params.data.totalplayerjoined ? "Match Full":"Join Now (" + (+this.props.navigation.state.params.data.totalplayer - +this.props.navigation.state.params.data.totalplayerjoined) + " Left)",
            color: +this.props.navigation.state.params.data.totalplayer == +this.props.navigation.state.params.data.totalplayerjoined ? '#bdbdbd':'#f44336',
            action: () => +this.props.navigation.state.params.data.totalplayer == +this.props.navigation.state.params.data.totalplayerjoined ? null : this.joinMatch(this.props.navigation.state.params.data.id, this.props.navigation.state.params.data.entryfee)
        }
    }
    componentDidMount(){
        this._joinStatus();
    }
    joinMatch(id, entry){
        ToastAndroid.show('Please Wait!', ToastAndroid.SHORT);
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
                entryfee: entry
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
            <Screen style={{flex: 1}}>
                <ImageBackground source={{uri: data.banner, isStatic: true}} style={styles.imgBg}>
                    <View style={styles.overlay}></View>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left" color='#fff' size={25}/>
                        </TouchableOpacity>
                        <Title styleName='bold' style={{color: '#fff'}}>Join Match #{data.id}</Title>
                    </View>
                    <View style={styles.headerCon}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../images/circular-clock.png')} style={{width:50,height:50,resizeMode:'contain'}}/>
                            <View style={{marginLeft:10}}>
                                <Title style={{color: '#fff'}}>{time}</Title>
                                <Title style={{color: '#fff',fontSize:15}}>{date}</Title>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',marginTop: 15}}>
                                <Title style={{color: '#fff',fontSize:19}}>{data.totalplayerjoined}/{data.totalplayer} Joined</Title>
                        </View>
                    </View>
                    
                </ImageBackground>
                <View style={styles.container}>
                    <View style={styles.grid}>
                        <Title style={styles.subText}>Match Details:</Title>
                        <Title style={styles.gridText}>Type: {data.matchtype}</Title>
                        <Title style={styles.gridText}>Mode: {data.type}</Title>
                        <Title style={styles.gridText}>Map: {data.map}</Title>
                    </View>
                    <View style={styles.grid}>
                        <Title style={styles.subText}>Prize Details:</Title>
                        <Title style={styles.gridText}>Per Kill: ₹{data.perkill} </Title>
                        <Title style={styles.gridText}>Win: ₹{data.winprice}</Title>
                        <Title style={styles.gridText}>Entry Fee: ₹{data.entryfee}</Title>
                    </View>
                    <View syle={styles.grid}>
                        <Title style={styles.subText}>Rules:</Title>
                        <Text style={{marginHorizontal: 20,color: '#212121'}}>{data.rule}</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button,{backgroundColor: this.state.color}]} onPress={this.state.action}>
                    <Text style={{color: '#fff',fontSize: 18}}>{this.state.button}</Text>
                </TouchableOpacity>
            </Screen>

        );
    }
}

const styles = StyleSheet.create({
    imgBg: {
        width: '100%',
        resizeMode: 'cover',
        flexGrow: 1
    },
    header: {
        height: 55,
        backgroundColor: 'transparent',
        color:'#fff',
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    headerCon: {
        flexGrow: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    icon: {
        position: 'absolute',
        left: 20
    },
    overlay:{
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    container: {
        width: '100%',
        height: '55%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: "wrap",
        paddingVertical:20
    },
    grid: {
        width: '50%',
    },
    imgIcon: {
        width:40,
        height:40,
        resizeMode:'contain'
    },
    gridText: {
        color: '#212121',
        width: '100%',
        marginVertical: 3,
        marginHorizontal: 20,
        fontSize: 15
    },
    subText: {
        width: '100%',
        marginVertical: 3,
        marginHorizontal: 20,
        color: '#f44336'
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