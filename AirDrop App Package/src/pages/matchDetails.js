import React, { Component } from 'react';
import {createSwitchNavigator, createStackNavigator,createAppContainer} from 'react-navigation';
// COMPONENTS
import { StatusBar, Text, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Linking, Alert, Clipboard } from 'react-native';
import { Row, Title,  Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';

export default class matchDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            button: 'Join Now',
            action: this.props.navigation.state.params.data.livelink == null ? () => ToastAndroid.show("This match isn't live yet", ToastAndroid.SHORT) : () => Linking.openURL(this.props.navigation.state.params.data.livelink)
        }        
    }
    showRoomDetails(data) {
        Alert.alert('Prepare for battle', 'Room Id:  '+data.roomid+'\nPassword:  '+data.roomid);
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
                        <Title styleName='bold' style={{color: '#fff'}}>Match Details #{data.id}</Title>
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
                        <Title style={styles.subText}>Room ID & Password:</Title>
                        <Text selectable={true} style={{marginHorizontal: 20,marginVertical:5,color: '#212121'}} onPress={() => {Clipboard.setString(data.roomid); ToastAndroid.show('Room ID Copied!', ToastAndroid.SHORT);}}>Room ID: {data.roomid}</Text>
                        <Text selectable={true} style={{marginHorizontal: 20,marginVertical:5,color: '#212121'}} onPress={() => {Clipboard.setString(data.roompassword); ToastAndroid.show('Room Password Copied!', ToastAndroid.SHORT);}}>Password: {data.roompassword}</Text>
                    </View>
                </View>
                <View style={styles.btnCon}>
                    <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('market://details?id=com.tencent.ig')}>
                        <Text style={{color: '#f44336',fontSize: 18}}>Launch PUBGM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.roomBtn]} onPress={this.state.action}>
                        <Text style={{color: '#fff',fontSize: 18}}>Watch live </Text>
                        <Icon name="youtube" size={24} color='#fff' style={{marginLeft:5}}/>
                    </TouchableOpacity>
                </View>
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
    btnCon: {
        width: '100%',
        flexDirection: 'row'
    },
    button: {
        color: '#f44336',
        backgroundColor: '#fff',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        height: 50,
        width: '50%',
        flexDirection: 'row',
        borderColor: '#f44336',
        borderWidth: 1,     
    },
    roomBtn: {
        color: '#ffffff',
        backgroundColor: '#f44336',
    }
});