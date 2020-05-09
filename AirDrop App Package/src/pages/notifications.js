import React, { Component } from 'react';
// COMPONENTS
import { StatusBar, Text, StyleSheet, Image, TouchableOpacity, View, ScrollView, ToastAndroid, Dimensions, Clipboard } from 'react-native';
import { Row, Title, Subtitle, Caption, Screen } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';
// REDUX
import config from '../config/config';
import { store } from '../redux/Store';
import { RemoveNotification } from '../redux/Actions/Actions';
// CUSTOM COMPONENTS
import Header from '../component/headerBack';
import Chat from '../component/chatButton';
// FIREBASE
import firebase from 'react-native-firebase';

export default class NotificationPage extends Component {
    constructor(){
        super();
        this.state = {
            notifications: store.getState().notifications
        }
    }
    componentDidMount(){
        store.subscribe(() => {
            this.setState({
                notifications: store.getState().notifications
            })
        })
        setTimeout(() => {
            store.dispatch(RemoveNotification(null));
        }, 2000);
    }
    render(){
        let notifications = this.state.notifications.map((notif, index) => {
            return(
                <View key={index} style={styles.notif}>
                    <Image source={require('../images/bell.png')} style={styles.ico}/>
                    <Text style={{width: Dimensions.get('window').width - 70}} selectable={true}>{notif}</Text>
                </View>
            );
        })
        return(
            <Screen style={{backgroundColor:'#10102d'}}>
                <Header text='Notifications'/>
                {notifications}
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    notif: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#bdbdbd',
        borderWidth: 1,
        margin:10,
        padding:10,
        flexDirection: 'row',
    },
    ico: {
        width: 40,
        height: 40,
        marginRight:10,
        resizeMode: 'contain'
    }
})