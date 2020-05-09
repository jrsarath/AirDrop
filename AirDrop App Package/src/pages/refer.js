import React, { Component } from 'react';
import { StatusBar, Text, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Share, Dimensions, Clipboard } from 'react-native';
import { Row, Title, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather'
// CUSTOM COMPONENET 
import Header from '../component/header';
import { store } from '../redux/Store';
import Chat from '../component/chatButton';

export default class ReferScreen extends Component {
    share(){
        Share.share({
            message: '--- Play Game Win Cash ---\n'+
                     'Are you PUBG Lover?\n' +
                     'Easy Way to Make Money Just Paly PUBG.. \n' +
                     'Try out “GAME SETTER” App, where you can earn real MONEY . Join Daily GAME SETTER TOURNAMENTS & Get BIG Rewards on Each Kill AND CHICKEN DINNERS in PUBG\n' +
                     'Just Download the “GAME SETTER” Android App & Register using the Promo Code given below to Get Rs. 10 Free Signup Bonus. \n\n' +
                     'Use This Refer Code - '+store.getState().userData.refercode+
                     '\n\nhttps://gamesetter.in/Gamesetter.apk',
            url: 'https://gamesetter.in/Gamesetter.apk' // TO BE CHANGED
        });
    }
    render() {
        return (
            <Screen>
                <Header />
                <ScrollView>
                    <View style={styles.header}>
                        <Image source={require('../images/gifts.png')} style={styles.banner} />
                        <Title style={{color:'#ffc50c',fontWeight:'bold'}}>REFER MORE TO EARN MORE</Title>
                        <Subtitle styleName='h-center' style={{color:'#fff', lineHeight:16,width:'80%'}}>Invite your friends to App install using your promo code and Easy Earn Rs. 10 /- when they join first contest and your friends also get Rs.10/- for SignUp. Invite more friends earn more money!</Subtitle>
                    </View>
                    <View style={styles.container}>
                        <Title styleName='h-center'>YOUR PROMO CODE</Title>
                        <TouchableOpacity style={styles.codeCon} onPress={() => {Clipboard.setString(store.getState().userData.refercode); ToastAndroid.show('Promo Code Copied!', ToastAndroid.SHORT);}}>
                            <Text style={{color:'#212121'}}>{store.getState().userData.refercode}</Text>
                        </TouchableOpacity>
                        <Text style={styles.howit}>How it works ?</Text>
                        <View style={styles.imgCon}>
                            <View style={styles.step}>
                                <Image source={require('../images/login.png')} style={styles.stepImg}/>
                                <Text style={styles.stepText}>User Registers</Text>
                            </View>
                            <View style={styles.step}>
                                <Icon name='chevron-right' size={40} color='#f44336'/>
                            </View>
                            <View style={styles.step}>
                                <Image source={require('../images/game.png')} style={styles.stepImg}/>
                                <Text style={styles.stepText}>Joins a Match</Text>
                            </View>
                            <View style={styles.step}>
                                <Icon name='chevron-right' size={40} color='#f44336'/>
                            </View>
                            <View style={styles.step}>
                                <Image source={require('../images/money.png')} style={styles.stepImg}/>
                                <Text style={styles.stepText}>You get Rewarded</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => this.share()}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Refer Now</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Chat />
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#10102d',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    banner: {
        resizeMode: 'contain',
        width: 130,
        height: 105
    },
    container: {
        flex: 1,
        paddingTop: 40,
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center', 
        alignContent: 'center', 
        justifyContent: 'center'
    },
    button: {
        height: 48,
        color: '#ffffff',
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44336',
        margin: 10,
        marginTop: 20,
        width: Dimensions.get('window').width - 20,
    },
    codeCon: {
        margin: 10,
        paddingVertical:10,
        paddingHorizontal: 15,
        backgroundColor: '#ffc107',
        borderRadius: 2,
        borderColor: '#212121',
        borderWidth: 2,
        borderStyle: 'dashed'
    },
    howit: {
        color: 'dodgerblue', 
        fontSize: 18,
    },
    imgCon: {
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    stepText: {
        fontSize: 12,
        marginTop: 5
    },
    step: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});