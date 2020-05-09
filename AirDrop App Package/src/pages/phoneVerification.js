import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Linking } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';
// CUSTOM COMPONENT
import Header from '../component/headerBack';
import Loading from '../component/loader';
import Chat from '../component/chatButton';
// REDUX 
var md5 = require('js-md5');
import config from '../config/config.js'
import { SignIn } from '../redux/Actions/Actions';
import { store } from '../redux/Store';

export default class OtpScreen extends Component {
    constructor(){
        super();
        this.state = {
            loading: true,
            btnSend: 'Send OTP',
            btnVerify: 'Verify OTP',
            btnSendColor: '#f44336',
            btnVerifyColor: '#bdbdbd',
            phone: store.getState().userData.phone,
            otp: '',
            code: '',
            editable: false,
            action: () => this._sendCode(),
            actionTwo: () => null,
        }
    }
    componentDidMount() {
         
    }
    _sendCode() {
        var code = Math.floor(Math.random() * 900000) + 100000;
        ToastAndroid.show('Sending OTP', ToastAndroid.SHORT);
        this.setState({
            btnSend: 'Please Wait..',
            btnSendColor: '#bdbdbd',
            editable: true,
            action: () => null,
            actionTwo: () => this._VerifyCode(),
            code: code,
        });
              
        var url = 'https://api.msg91.com/api/sendhttp.php?mobiles='+store.getState().userData.phone+'&authkey=232484AdRxzpQ4Rhk5b785182&route=4&sender=GMESTR&message=Hi '+store.getState().userData.name+'. Please use OTP: '+code+' to verify your mobile number with Game Setter&country=91&response=json';
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                "Cache-Control": "no-cache",
            }),
        })
        .then((e) => {
            console.log(e);
            if (e.type = 'success' ) {
                ToastAndroid.show('OTP Sent', ToastAndroid.SHORT);
                this.setState({
                    btnSend: 'OTP Sent',
                    btnSendColor: '#4caf50',
                    btnVerifyColor: '#f44336',
                    editable: true,
                    action: () => null,
                    actionTwo: () => this._VerifyCode(),
                });
                setTimeout(() => {
                    this.setState({
                        btnSend: 'Resend OTP',
                        btnSendColor: '#ef5350',
                        action: () => this._sendCode(),
                        actionTwo: () => this._VerifyCode(),
                    })
                }, 60000);
            } else {
                ToastAndroid.show('Something went wrong, Try Again later', ToastAndroid.SHORT);
                this.setState({
                    btnSend: 'Try Again',
                    btnSendColor: '#f44336',
                    editable: true,
                    action: () => () => this._sendCode(),
                    actionTwo: () => null,
                });
            }
        }).catch((error) => {
            console.log(error);
            ToastAndroid.show('Something went wrong, Try Again later', ToastAndroid.SHORT);
            this.setState({
                btnSend: 'Try Again',
                btnSendColor: '#f44336',
                editable: true,
                action: () => () => this._sendCode(),
                actionTwo: () => null,
            });
        });
    }
    _VerifyCode() {
        if (this.state.otp != '') {
            this.setState({
                btnVerify: 'Please Wait..',
                btnVerifyColor: '#bdbdbd',
                actionTwo: () => null,
            });
            if (this.state.otp == this.state.code) {
                fetch(config.domain + "api/user.php", {
                        method: 'POST',
                        headers: new Headers({
                            'Accept': 'application/json',
                            "Accept-Encoding": "gzip, deflate",
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            action: "verify_phone",
                            user: store.getState().user,
                        })
                    }).then((response) => response.json())
                    .then((e) => {
                        if (e.status = 'true') {
                            ToastAndroid.show('Thank you for verifying your mobile number', ToastAndroid.SHORT);
                            this.props.navigation.goBack();
                        } else {
                            ToastAndroid.show('Something went wrong, Try Again later', ToastAndroid.SHORT);
                            this.setState({
                                btnVerify: 'Try Again',
                                btnVerifyColor: '#f44336',
                                actionTwo: () => this._VerifyCode(),
                            });
                        }
                    }).catch((error) => {
                        console.log(error);
                        ToastAndroid.show('Something went wrong, Try Again later', ToastAndroid.SHORT);
                        this.setState({
                            btnVerify: 'Try Again',
                            btnVerifyColor: '#f44336',
                            actionTwo: () => this._VerifyCode(),
                        });
                    });
            } else {
                ToastAndroid.show('Invalid OTP. Please try again', ToastAndroid.SHORT);
                this.setState({
                    btnVerify: 'Try Again',
                    btnVerifyColor: '#f44336',
                    actionTwo: () => this._VerifyCode(),
                });
            }
        } else {
            ToastAndroid.show('Please enter OTP first', ToastAndroid.SHORT);
        }
    }
    render() {
        return(
            <Screen style={{backgroundColor: '#fff'}}>
                <Header text='Mobile Verification' />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.textCon}>
                            <Title style={{color:'#f44336'}}>Mobile No verification</Title>
                            <Subtitle style={{color:'#4a4a4a'}}>Please verify your mobile number to unlock full benefits</Subtitle>
                        </View>                        

                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    maxLength={10}
                                    style={styles.input}
                                    keyboardType={'numeric'}
                                    value={this.state.phone}
                                    placeholder='Your Phone Number'
                                    autoCompleteType='tel'
                                    editable={false}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={[styles.button, {backgroundColor: this.state.btnSendColor,marginBottom:20}]} onPress={this.state.action}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{this.state.btnSend}</Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>OTP</Text>
                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    maxLength={6}
                                    style={styles.input}
                                    keyboardType={'numeric'}
                                    value={this.state.otp}
                                    placeholder='OTP'
                                    onChangeText={(text) => this.setState({ otp: text })}
                                    editable={this.state.editable}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={[styles.button, {backgroundColor: this.state.btnVerifyColor}]} onPress={this.state.actionTwo}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{this.state.btnVerify}</Text>
                        </TouchableOpacity>
                    </View>
                    
                </ScrollView>
                <Chat />
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignContent: 'center',
        backgroundColor: '#fff'
    },
    textCon: {
        padding: 20,
        paddingBottom:10
    },  
    container: {
        height: '100%',
        width: '100%'
    },
    inputCon: {
        display: 'flex',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    inputWrapper: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        borderRadius: 10,
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 8,
        backgroundColor: '#fff',
    },
    input: {
        padding: 13,
        paddingHorizontal: 15,
    },
    errorText: {
        marginTop: 10,
        color: '#f44336',
    },
    errorIcon: {
        top: 12,
        right: 10,
        zIndex: 5,
        position: 'absolute',
    },
    button: {
        height: 50,
        color: '#ffffff',
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44336',
        marginHorizontal: 20
    },
    label: {
        marginLeft: 20,
        marginBottom: 5,
        marginTop:5,
        color: '#9e9e9e',
        fontSize: 14
    }
});