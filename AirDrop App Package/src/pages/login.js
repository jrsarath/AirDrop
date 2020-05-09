import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground  } from 'react-native';
import { Row, Title, Heading, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';
// AUTH
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
var md5 = require('js-md5');
// REDUX
import config from '../config/config.js'
import { SignIn } from '../redux/Actions/Actions';
import { store } from '../redux/Store';


export default class Login extends Component {
    constructor(){
        super();
        GoogleSignin.configure();
        this.state = {
            inputEmail: '',
            inputPass: '',
            button: 'Login',
            val: {
                email: false,
                password: false,
                emailAlt: false,
                passwordAlt: false,
            }
        }
    }
    login(){
        if (this.state.inputEmail != '' && this.state.inputPass != '') {
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
                            action: "login",
                            email: this.state.inputEmail,
                            password: md5(this.state.inputPass)
                        })
                    })
                    .then((response) => response.json())
                    .then((responseText) => {
                        console.log(responseText);
                        if (responseText.status == 'success') {
                            store.dispatch(SignIn({
                                email: this.state.inputEmail,
                                userData: responseText.data[0],
                                //password: md5(this.state.inputPass)
                            }));
                            ToastAndroid.show('Welcome Back to GAME SETTER', ToastAndroid.LONG);
                            this.props.navigation.navigate('App');
                        } else if (responseText.status == 'missmatch') {
                            this.setState(last => ({
                                val: {
                                    ...last.val,
                                    passwordAlt: true
                                }
                            }));
                            ToastAndroid.show('Please Check your Email Address', ToastAndroid.LONG);
                        } else if (responseText.status == 'not-exist') {
                            this.setState(last => ({
                                val: {
                                    ...last.val,
                                    emailAlt: true
                                }
                            }));
                            ToastAndroid.show('Please Check your Email & Password', ToastAndroid.LONG);
                        } else {
                            ToastAndroid.show('Sorry, something went wrong. Contact Support', ToastAndroid.LONG);
                            this.setState({
                                button: 'Try Again'
                            });
                        }
                        this.setState({
                            button: 'Login'
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
                    <Image
                        style={styles.img}
                        source={require('../images/logo.png')}
                    />
                    <Title styleName='h-center' style={styles.title}>LOGIN TO GAME SETTER</Title>
                    <View style={styles.login}>
                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={this.state.inputEmail}
                                    style={this.state.val.emailAlt ? [styles.input, styles.hasError] : styles.input}
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
                            {this.state.val.emailAlt ? <Text style={styles.errorText}>A user with this email Not Found</Text> : null}
                        </View>
                        
                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={this.state.inputPass}
                                    secureTextEntry={true}
                                    style={this.state.val.passwordAlt ? [styles.input, styles.hasError] : styles.input}
                                    onChangeText={(text) => this.setState({inputPass:text})}
                                    placeholder='Your Password'
                                />
                            </View>
                            {this.state.val.passwordAlt ? <Text style={styles.errorText}>Invalid Email & Password Combination</Text> : null}
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => this.login()}>
                            <Text style={{color: '#fff',fontSize: 18}}>{this.state.button}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.forgot}>
                        <TouchableOpacity style={styles.forgotbtn} onPress={() => this.props.navigation.navigate('Signup')}>
                            <Subtitle style={styles.textWhite}>New Account</Subtitle>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.forgotbtn} onPress={() => this.props.navigation.navigate('Forgot')}>
                            <Subtitle style={styles.textWhite}>Forgot Password</Subtitle>
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
    login: {
        width: '95%',
        textAlign: 'center',
        alignSelf: 'center',
    },
    title: {
        color: '#fff',
        marginVertical: 15
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
        padding: 11,
        paddingHorizontal: 15,
        borderWidth:2,
        borderColor: '#fff',
        borderRadius: 10,
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
    },
    hasError: {
        borderColor: '#f44336',
    }
})