import React, { Component } from 'react';
import {createSwitchNavigator, createStackNavigator,createAppContainer} from 'react-navigation';
// COMPONENTS
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';

export default class joinMatch extends Component {
    constructor(){
        super();    
    }
    joinMatch(id){
        console.log(id);
    }
    render(){
        const { navigation } = this.props;
        const data = navigation.getParam("data");
        console.log(data);
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
                            <Image source={require('../images/deadline.png')} style={{width:50,height:50,resizeMode:'contain'}}/>
                            <View style={{marginLeft:10}}>
                                <Title style={{color: '#fff'}}>{time}</Title>
                                <Title style={{color: '#fff',fontSize:15}}>{date}</Title>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',marginTop: 15}}>
                                <Title style={{color: '#fff',fontSize:19}}>Entry Fee:  ₹ {data.entryfee}</Title>
                        </View>
                    </View>
                    
                </ImageBackground>
                <View style={styles.container}>
                    <View style={styles.grid}>
                        <Image source={require('../images/army.png')} style={styles.imgIcon}/>
                        <Text style={styles.gridText}>TYPE: {data.matchtype}</Text>
                    </View>
                    <View style={styles.grid}>
                        <Image source={require('../images/goal.png')} style={styles.imgIcon}/>
                        <Text style={styles.gridText}>MODE: {data.type}</Text>
                    </View>
                    <View style={styles.grid}>
                        <Image source={require('../images/money.png')} style={styles.imgIcon}/>
                        <Text style={styles.gridText}>₹{data.perkill} PER KILL</Text>
                    </View>
                    <View style={styles.grid}>
                        <Image source={require('../images/trophy.png')} style={styles.imgIcon}/>
                        <Text style={styles.gridText}>₹{data.winprice} FOR WIN</Text>
                    </View>
                    <View style={styles.grid}>
                        <Image source={require('../images/forest.png')} style={styles.imgIcon}/>
                        <Text style={styles.gridText}>MAP: {data.map}</Text>
                    </View>
                    <View style={styles.grid}>
                        <Image source={require('../images/group.png')} style={styles.imgIcon}/>
                        <Text style={styles.gridText}>{data.totalplayerjoined}/{data.totalplayer} JOINED</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.joinMatch(data.id)}>
                    <Text style={{color: '#fff',fontSize: 18}}>Join Now ({+data.totalplayer - +data.totalplayerjoined} Left)</Text>
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
        flexWrap: "wrap"
    },
    grid: {
        height: '50%',
        width: '33.3333333333%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    imgIcon: {
        width:40,
        height:40,
        resizeMode:'contain'
    },
    gridText: {
        color: '#212121',
        marginTop:10
    },  
    button: {
        bottom: 0,
        color: '#ffffff',
        backgroundColor: '#f44336',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        height: 50,
        width: '100%',
        
    }
});