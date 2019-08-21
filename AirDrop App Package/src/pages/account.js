import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Linking } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
// CUSTOM COMPONENT
import Header from '../component/header';
import Loading from '../component/loader';
// REDUX 
var md5 = require('js-md5');
import config from '../config/config.js'
import { store } from '../redux/Store';
// PAGES
import AccountEdit from './acountEdit'; 

export class AccountView extends Component{
    constructor(){
        super();
        this.state = {
            name: store.getState().userData.name,
            gamertag: store.getState().userData.gamertag,
            balance: store.getState().wallet
        }
    }
    componentDidMount() {
        store.subscribe(() => {
            this.setState({
                name: store.getState().userData.name,
                gamertag: store.getState().userData.gamertag,
                balance: store.getState().wallet
            })
        })
    }
    render(){
        return(
            <ScrollView>
                <Header />
                <View style={styles.header}>
                    <View style={{marginTop: -40,flexDirection: 'row',alignItems: 'center',justifyContent:'center'}}>
                        <Image source={require('../images/guy.png')} style={styles.avatar}/>
                        <View>
                            <Title style={{fontSize:17,color:'#fff'}}>{this.state.name}</Title>
                            <Subtitle style={{fontSize:14,color:'#fff'}}>PUBG Username : {this.state.gamertag}</Subtitle>
                            <Title style={{fontSize:17,color:'#fff'}}>Balance : ₹ {this.state.balance}</Title>
                        </View>
                    </View>
                </View>
                <View style={styles.subHeader}>
                    <View style={styles.subHeaderItem}>
                        <Title>0</Title>
                        <Subtitle style={{fontSize:13,color: '#10102d', fontWeight: 'bold'}}>Match Played</Subtitle>
                    </View>
                    <View style={[styles.subHeaderItem, styles.borderBoth]}>
                        <Title>₹ 0</Title>
                        <Subtitle style={{fontSize:13,color: '#10102d', fontWeight: 'bold'}}>Total Earned</Subtitle>
                    </View>
                    <View style={styles.subHeaderItem}>
                        <Title>0</Title>
                        <Subtitle style={{fontSize:13,color: '#10102d', fontWeight: 'bold'}}>Chicken Dinner</Subtitle>
                    </View>
                </View>
                <View style={styles.list}>
                    <View style={styles.listItem}>
                        <Image style={styles.listIcon} source={require('../images/add-friend.png')}/>
                        <Text style={styles.listLabel}>Refer & Earn</Text>
                        <Icon name='chevron-right' size={20} color='#616161' />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default AccountScreen = createStackNavigator({
    Account: { screen: AccountView },
    AccountEdit: { screen: AccountEdit } 
  },{
    initialRouteName: "Account",
    headerMode: 'none'
});

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#10102d',
        height: 180,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 15
    },
    subHeader: {
        marginHorizontal:10,
        marginTop: -40,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical:10,
        elevation: 2,
        marginBottom:10
    },
    subHeaderItem: {
        flexGrow: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    borderBoth: {
        borderLeftColor: '#212121',
        borderLeftWidth: 1.5,
        borderRightColor: '#212121',
        borderRightWidth: 1.5
    },
    avatar: {
        marginRight:5,
        height:100,
        width:100,
        resizeMode: "contain",
    },
    list: {
        paddingVertical: 15
    },
    listItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        elevation: 2,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    listIcon: {
        resizeMode: 'contain',
        height: 40,
        width: 40
    },
    listLabel: {
        color: '#212121',
        fontWeight: 'bold'
    }
});