import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Alert } from 'react-native';
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
            inputName: '',
            inputPhone: '',
            inputGamertag: '',
            inputEmail: '',
            inputPass: '',
            confPass: '',
            inputReferrer: '',
            button: "Create Account",
            val: {
                email: false,
                phone: false,
                pass: false,
                confPass: false,
            }
        }
    }

    signup(){
        if (this.state.inputName != '' && this.state.inputPhone != '' && this.state.inputGamertag != '' && this.state.inputEmail != '' && this.state.inputPass != '' && this.state.confPass != '') {
            this.setState({
                button: 'Please Wait..'
            });
            if (!this.state.val.email && !this.state.val.pass && !this.state.val.cnfPass && !this.state.val.phone) {
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
                            action: "signup",
                            email: this.state.inputEmail,
                            name: this.state.inputName,
                            phone: this.state.inputPhone,
                            gamertag: this.state.inputGamertag,
                            password: md5(this.state.inputPass),
                            referrer: this.state.inputReferrer
                        })
                    })
                    .then((response) => response.json())
                    .then((responseText) => {
                        console.log(responseText);
                        if (responseText.status == 'success') {
                            ToastAndroid.show('Welcome to GAME SETTER ' + this.state.inputName, ToastAndroid.LONG);
                            this.props.navigation.navigate('OtpAlt', {email:this.state.inputEmail,phone:this.state.inputPhone});
                            this.setState({
                                button: 'Create Account'
                            });
                        } else if (responseText.status == 'duplicate') {
                            Alert.alert('Attention', 'Provided Email or Phone number is already associated with another account. Please check and try again');
                            this.setState({
                                button: 'Try again'
                            });
                        } else {
                            ToastAndroid.show('Sorry, something went wrong. Try Again', ToastAndroid.LONG);
                            this.setState({
                                button: 'Try again'
                            });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        ToastAndroid.show('Sorry, something went wrong. Contact Support', ToastAndroid.LONG);
                        this.setState({
                            button: 'Try Again'
                        });
                    });
            } else {
                ToastAndroid.show('Please enter valid informations!', ToastAndroid.LONG);
            }   
        } else {
            ToastAndroid.show('Please enter all required info!', ToastAndroid.LONG);
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
                    <ScrollView>
                        <View style={styles.login}>
                            <View style={styles.inputCon}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        value={this.state.inputName}
                                        style={styles.input}
                                        onChangeText={(text) => this.setState({ inputName: text })}
                                        placeholder='Your Name'
                                        autoCompleteType = 'name'
                                    />
                                </View>
                            </View>

                            <View style={styles.inputCon}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        maxLength={10}
                                        style={styles.input}
                                        keyboardType={'numeric'}
                                        value={this.state.inputPhone}
                                        placeholder='Your Phone Number'
                                        autoCompleteType='tel'
                                        onChangeText={
                                            (text) => {
                                                this.setState({ inputPhone: text });
                                                var reg = /^[6-9]\d{9}$/;
                                                !reg.test(text) ? this.setState(last => ({val: { ...last.val, phone: true}})) : this.setState(last => ({val: { ...last.val, phone: false}})); 
                                            }
                                        }
                                    />
                                    {this.state.val.phone ? <Icon name='x' color='#f44336' size={30} style={styles.errorIcon} /> : null}
                                </View>
                                {this.state.val.phone ? <Text style={styles.errorText}>Please enter a Valid Mobile Number</Text> : null}
                            </View>

                            <View style={styles.inputCon}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        value={this.state.inputEmail}
                                        style={styles.input}
                                        autoCompleteType='email'
                                        onChangeText={
                                            (text) => {
                                                this.setState({inputEmail:text});
                                                var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                !reg.test(text) ? this.setState(last => ({val: { ...last.val, email: true}})) : this.setState(last => ({val: { ...last.val, email: false}})); 
                                            }
                                        }
                                        placeholder='Your Email'
                                    />
                                    {this.state.val.email ? <Icon name='x' color='#f44336' size={30} style={styles.errorIcon} /> : null}
                                </View>
                                {this.state.val.email ? <Text style={styles.errorText}>Please enter a Valid Email</Text> : null}
                            </View>

                            <View style={styles.inputCon}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        value={this.state.inputGamertag}
                                        style={styles.input}
                                        onChangeText={(text) => this.setState({ inputGamertag: text })}
                                        placeholder='PUBG-M Username'
                                        autoCompleteType='off'
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.inputCon}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        value={this.state.inputPass}
                                        secureTextEntry={true}
                                        style={styles.input}
                                        onChangeText={(text) => this.setState({inputPass:text})}
                                        placeholder='Your Password'
                                        autoCompleteType='off'
                                        maxLength={16}
                                        onChangeText={
                                            (text) => {
                                                this.setState({inputPass:text});
                                                var reg = /^(?=.*\d).{4,16}$/;
                                                !reg.test(text) ? this.setState(last => ({val: { ...last.val, pass: true}})) : this.setState(last => ({val: { ...last.val, pass: false}})); 
                                                text != this.state.confPass ? this.setState(last => ({ val: { ...last.val, confPass: true}})) : this.setState(last => ({val: { ...last.val, confPass: false}}));
                                            }
                                        }
                                    />
                                    {this.state.val.pass ? <Icon name='x' color='#f44336' size={30} style={styles.errorIcon} /> : null}
                                </View>
                                {this.state.val.pass ? <Text style={styles.errorText}>Password should be 4-16 Digits, Should contain atleast one Number</Text> : null}
                            </View>

                            <View style={styles.inputCon}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        value={this.state.confPass}
                                        secureTextEntry={true}
                                        style={styles.input}
                                        onChangeText={(text) => this.setState({confPass:text})}
                                        placeholder='Confirm Password'
                                        autoCompleteType='off'
                                        onChangeText={
                                            (text) => {
                                                this.setState({confPass:text});
                                                this.state.inputPass != text ? this.setState(last => ({ val: { ...last.val, confPass: true}})) : this.setState(last => ({val: { ...last.val, confPass: false}}));
                                            }
                                        }
                                    />
                                    {this.state.val.confPass ? <Icon name='x' color='#f44336' size={30} style={styles.errorIcon} /> : null}
                                </View>
                                {this.state.val.confPass ? <Text style={styles.errorText}>Passwords doesnt match</Text> : null}
                            </View>

                            <View style={styles.inputCon}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        value={this.state.inputReferrer}
                                        style={styles.input}
                                        onChangeText={(text) => this.setState({ inputReferrer: text })}
                                        placeholder='Refer Code (Optional)'
                                        autoCompleteType='off'
                                    />
                                </View>
                            </View>
                            
                            
                            <TouchableOpacity style={styles.button} onPress={() => this.signup()}>
                                <Text style={{ color: '#fff', fontSize: 18 }}>{this.state.button}</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
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
        height: 48,
        color: '#ffffff',
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44336',
        marginHorizontal: 20,
        marginBottom: 20,
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