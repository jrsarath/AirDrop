import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Heading, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';
// AUTH
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
var md5 = require('js-md5');
import config from '../config/config.js'


export default class Signup extends Component {
    constructor() {
        super();
        this.state = {
            inputName: null,
            inputPhone: null,
            inputGamertag: null,
            inputEmail: null,
            inputPass: null,
            button: "Create Account"
        }
    }
    signup(){
        if (this.state.inputName != null && this.state.inputPhone != null && this.state.inputGamertag != null && this.state.inputEmail != null && this.state.inputPass != null){
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
                    action: "signup",
                    email: this.state.inputEmail,
                    name: this.state.inputName,
                    phone: this.state.inputPhone,
                    gamertag: this.state.inputGamertag,
                    password: md5(this.state.inputPass)
                })
            })
                .then((response) => response.json())
                .then((responseText) => {
                    console.log(responseText);
                    if (responseText.status == 'success'){
                        ToastAndroid.show('Welcome to GAME SETTER '+this.state.inputName, ToastAndroid.LONG);
                        this.props.navigation.navigate('Login');
                    } else if(responseText == 'false') {
                        ToastAndroid.show('Account already exists', ToastAndroid.LONG);
                    }
                    this.setState({
                        button: 'Create Account'
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
            ToastAndroid.show('Please enter required info!', ToastAndroid.LONG);
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
                        <Title styleName='bold' style={{ color: '#fff' }}>Create a new Account</Title>
                    </View>
                    <View style={{width: '100%',alignItems: 'center', flexGrow: 1,justifyContent: 'center'}}>
                        {/*<Heading styleName='h-center' style={styles.title}>CREATE NEW ACCOUNT</Heading>*/}
                        <View style={styles.login}>
                            <TextInput
                                value={this.state.inputName}
                                style={styles.input}
                                onChangeText={(text) => this.setState({ inputName: text })}
                                placeholder='Your Name'
                            />
                            <TextInput
                                value={this.state.inputEmail}
                                style={styles.input}
                                onChangeText={(text) => this.setState({ inputEmail: text })}
                                placeholder='Your Email'
                            />
                            <TextInput
                                value={this.state.inputGamertag}
                                style={styles.input}
                                onChangeText={(text) => this.setState({ inputGamertag: text })}
                                placeholder='PUBG-M Username'
                            />
                            <TextInput
                                value={this.state.inputPhone}
                                style={styles.input}
                                onChangeText={(text) => this.setState({ inputPhone: text })}
                                placeholder='Your Paytm Number'
                            />
                            <TextInput
                                value={this.state.inputPass}
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={(text) => this.setState({ inputPass: text })}
                                placeholder='New Password'
                            />
                            <TouchableOpacity style={styles.button} onPress={() => this.signup()}>
                                <Text style={{ color: '#fff', fontSize: 18 }}>{this.state.button}</Text>
                            </TouchableOpacity>

                            <GoogleSigninButton
                                style={styles.gbutton}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={this.signIn}
                                disabled={this.state.isSigninInProgress} />
                        </View>
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
        marginHorizontal: 10,
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
    overlay: {
        flex: 1,
        position: "absolute",
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
        marginBottom: 17,
        backgroundColor: '#fff',
        padding: 12,
        paddingHorizontal: 15
    },
    button: {
        height: 48,
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
    },
    icon: {
        position: 'absolute',
        left: 20
    }
})