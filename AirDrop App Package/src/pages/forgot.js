import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Alert  } from 'react-native';
import { Row, Title, Heading, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';
// AUTH
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
var md5 = require('js-md5');
// REDUX
import config from '../config/config.js'
import { SignIn } from '../redux/Actions/Actions';
import { store } from '../redux/Store';


export default class Forgot extends Component {
    constructor(){
        super();
        GoogleSignin.configure();
        this.state = {
            inputEmail: '',
            button: 'Reset Password',
            val: {
                email: false,
            }
        }
    }
    login(){
        if (this.state.inputEmail != '') {
            if (!this.state.val.email) {
                this.setState({
                    button: 'Please Wait..'
                });
                fetch(config.domain + "api/user.php", {
                        method: 'POST',
                        headers: new Headers({
                            'Accept': 'application/json',
                            "Accept-Encoding": "gzip, deflate",
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            action: "forgot",
                            email: this.state.inputEmail,
                        })
                    })
                    .then((response) => response.json())
                    .then((responseText) => {
                        console.log(responseText);
                        if (responseText.status == 'success') {
                            Alert.alert('Check your Email', 'We have sent you a email with instructions to reset your password, Kindly follow that to regain access. Remember to check spam folder too')
                            //this.props.navigation.navigate('Login');
                        } else if (responseText.status == 'false') {
                            ToastAndroid.show('Check your Email & Password', ToastAndroid.LONG);
                        } else {
                            ToastAndroid.show('Sorry, something went wrong. Contact Support', ToastAndroid.LONG);
                            this.setState({
                                button: 'Try Again'
                            });
                        }
                        this.setState({
                            button: 'Reset Password'
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        ToastAndroid.show('Sorry, something went wrong. Contact Support', ToastAndroid.LONG);
                        this.setState({
                            button: 'Try Again'
                        });
                    });


            } else {
                ToastAndroid.show('Invalid Email', ToastAndroid.LONG);
            }
        } else {
            ToastAndroid.show('Please enter Email & Password!', ToastAndroid.LONG);
            this.setState({
                button: 'Try Again'
            });
        }
    }
    render() {
        return (
            <Screen>
                <ImageBackground source={require('../images/wallpaper.jpg')} style={styles.mainView} blurRadius={1}>
                    <View style={styles.overlay}></View>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left" color='#fff' size={25} />
                        </TouchableOpacity>
                        <Title styleName='bold' style={{ color: '#fff' }}>Forgot Password</Title>
                    </View>
                    <Title styleName='h-center' style={styles.title}>Reset your password</Title>
                    <View style={styles.login}>
                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={this.state.inputEmail}
                                    style={styles.input}
                                    onChangeText={
                                        (text) => {
                                            this.setState({inputEmail:text});
                                            var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                            !reg.test(text) ? this.setState({val: {email: true}}) : this.setState({val: {email: false}}); 
                                        }
                                    }
                                    placeholder='Your Email'
                                />
                                {this.state.val.email ? <Icon name='x' color='#f44336' size={30} style={styles.errorIcon} /> : null}
                            </View>
                            {this.state.val.email ? <Text style={styles.errorText}>Please enter a Valid Email</Text> : null}
                        </View>
                        
                        <TouchableOpacity style={styles.button} onPress={() => this.login()}>
                            <Text style={{color: '#fff',fontSize: 18}}>{this.state.button}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent:'center'
    },
    header: {
        height: 70,
        color: '#fff',
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        top:0,
        left: 0
    },
    icon: {
        position: 'absolute',
        left: 20
    },
    login: {
        width: '95%',
        textAlign: 'center',
        alignSelf: 'center',
    },
    title: {
        color: '#fff',
        marginVertical: 40
    },
    forgot: {
        color: '#fff',
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    forgotbtn: {
        flexGrow: 1,
        marginHorizontal:10,
        height: 40,
        color: '#ffffff',
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d47a1',
    },
    textWhite: {
        color: '#fff',
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    overlay: {
        flex: 1,
        position:"absolute",
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: 0.6,
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
        marginTop:10,
        color: '#f44336',
    },
    errorIcon: {
        top: 12,
        right: 10,
        zIndex: 5,
        position: 'absolute',
    },
    button: {
        height: 45,
        color: '#ffffff',
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44336',
        marginHorizontal: 20,
    },
    gbutton: {
        marginTop: 10,
        borderRadius: 5,
        height: 50, 
        marginHorizontal: 16,
    }
})