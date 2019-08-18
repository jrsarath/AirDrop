import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground  } from 'react-native';
import { Row, Title, Heading, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
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
            inputEmail: null,
            inputPass: null,
            button: 'Login'
        }
    }
    GsignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
            console.log(userInfo);
        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
    login(){
        if (this.state.inputEmail != null && this.state.inputPass != null){
            this.setState({
                button: 'Please Wait..'
            });
            fetch(config.domain+"api/user.php", {
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
                    if (responseText.status == 'success'){
                        store.dispatch(SignIn({
                            email: this.state.inputEmail,
                            password: md5(this.state.inputPass)
                        }));
                        ToastAndroid.show('Welcome Back to GAME SETTER', ToastAndroid.LONG);
                        this.props.navigation.navigate('App');
                    } else if (responseText.status == 'false') {
                        ToastAndroid.show('Check your Email & Password', ToastAndroid.LONG);
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
                        <TextInput
                            value={this.state.inputEmail}
                            style={styles.input}
                            onChangeText={(text) => this.setState({inputEmail:text})}
                            placeholder='Your Email'
                        />
                        <TextInput
                            value={this.state.inputPass}
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={(text) => this.setState({inputPass:text})}
                            placeholder='Your Password'
                        />
                        <TouchableOpacity style={styles.button} onPress={() => this.login()}>
                            <Text style={{color: '#fff',fontSize: 18}}>{this.state.button}</Text>
                        </TouchableOpacity>
                        
                        <GoogleSigninButton
                            style={styles.gbutton}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this.GsignIn}
                            disabled={this.state.isSigninInProgress} />
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
        marginVertical: 30
    },
    forgot: {
        color: '#fff',
        marginVertical: 30,
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
    input: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        borderRadius: 10,
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 8,
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 13,
        paddingHorizontal: 15
    },
    button: {
        height: 45,
        color: '#ffffff',
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44336',
        marginHorizontal: 20
    },
    gbutton: {
        marginTop: 10,
        borderRadius: 5,
        height: 50, 
        marginHorizontal: 16,
    }
})