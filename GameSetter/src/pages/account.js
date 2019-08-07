import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENT
import Header from '../component/header';
// REDUX 
var md5 = require('js-md5');
import config from '../config/config.js'
import { GetOngoing } from '../redux/Actions/Actions';
import { store } from '../redux/Store';

export default class AccountScreen extends Component {
    constructor(){
        super();
        this.state = {
            name: null,
            phone: null,
            gamertag: null,
            oldPassword: null,
            password: null,
            newPassword: null
        }
    }
    componentDidMount() {
        fetch(config.domain + "api/user.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                action: "profile",
                user: store.getState().user
            })
        })
            .then((response) => response.json())
            .then((resJson) => {
                console.log('Fetched');
                this.setState({
                    name: resJson.name,
                    phone: resJson.phone,
                    gamertag: resJson.gamertag,
                    oldPassword: resJson.password
                })
            })
            .catch((error) => {
                console.error(error);
                ToastAndroid.show('Error Fetching Profile', ToastAndroid.LONG);
            });
    }
    updateProfile(){
        if (this.state.name != null && this.state.phone != null && this.state.gamertag != null) {
            fetch(config.domain + "api/user.php", {
                    method: 'POST',
                    headers: new Headers({
                        'Accept': 'application/json',
                        "Accept-Encoding": "gzip, deflate",
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        action: "update_profile",
                        user: store.getState().user,
                        name: this.state.name,
                        phone: this.state.phone,
                        gamertag: this.state.gamertag
                    })
                })
                .then((response) => response.json())
                .then((resJson) => {
                    if (resJson.status == 'success') {
                        ToastAndroid.show('Profile Updated Successfully  ', ToastAndroid.LONG);
                    } else {
                        ToastAndroid.show('Error Updating Profile', ToastAndroid.LONG);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    ToastAndroid.show('Error Updating Profile', ToastAndroid.LONG);
                });
        } else {
            ToastAndroid.show('Please Enter All Info', ToastAndroid.LONG);
        }
    }
    updatePassword(){
        if (this.state.password != null && this.state.newPassword != null) {
            if (this.state.oldPassword = md5(this.state.password)) {
                fetch(config.domain + "api/user.php", {
                    method: 'POST',
                    headers: new Headers({
                        'Accept': 'application/json',
                        "Accept-Encoding": "gzip, deflate",
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        action: "update_password",
                        user: store.getState().user,
                        password: md5(this.state.newPassword)
                    })
                })
                    .then((response) => response.json())
                    .then((resJson) => {
                        if (resJson.status == 'success') {
                            ToastAndroid.show('Password Updated Successfully  ', ToastAndroid.LONG);
                            this.setState({
                                password: null,
                                newPassword: null
                            })
                        } else {
                            ToastAndroid.show('Error Updating Password', ToastAndroid.LONG);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        ToastAndroid.show('Error Updating Password', ToastAndroid.LONG);
                    });
            } else {
                ToastAndroid.show('Your Old & New Password Doesnt Match', ToastAndroid.LONG);
            }
        } else {
            ToastAndroid.show('Please enter Both Old & New Password', ToastAndroid.LONG);
        }
    }
    render() {
        return(
            <Screen style={{backgroundColor: '#fff'}}>
                <Header text='Game Setter' />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.textCon}>
                            <Title style={{color:'#f44336'}}>Profile</Title>
                            <Subtitle style={{color:'#4a4a4a'}}>Edit and manage your profile</Subtitle>
                        </View>
                        <TextInput
                            value={this.state.name}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ name: text })}
                            placeholder='Your Name'
                        />
                        <TextInput
                            value={this.state.phone}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ phone: text })}
                            placeholder='Your Paytm Number'
                        />
                        <TextInput
                            value={this.state.gamertag}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ gamertag: text })}
                            placeholder='Your PUBGM username'
                        />
                        <TouchableOpacity style={styles.button} onPress={() => this.updateProfile()}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Update Profile</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.textCon}>
                            <Title style={{color:'#f44336'}}>Update your Password</Title>
                            <Subtitle style={{color:'#4a4a4a'}}>Always keep your password Strong and Safe</Subtitle>
                        </View>
                        <TextInput
                            value={this.state.password}
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ password: text })}
                            placeholder='Old Password'
                        />
                        <TextInput
                            value={this.state.newPassword}
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ newPassword: text })}
                            placeholder='New Password'
                        />
                        <TouchableOpacity style={styles.button} onPress={() => this.updatePassword()}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Update Password</Text>
                        </TouchableOpacity>
                        <View style={styles.textCon}>
                            <Title style={{color:'#f44336'}}>Support</Title>
                            <Subtitle style={{color:'#4a4a4a'}}>
                                Support Info
                            </Subtitle>
                        </View>
                        <View style={styles.textCon}>
                            <Title style={{color:'#f44336'}}>Terms</Title>
                            <Subtitle style={{color:'#4a4a4a'}}>
                                Support Info
                            </Subtitle>
                        </View>
                    </View>
                    
                </ScrollView>
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
        marginBottom: 15,
        backgroundColor: '#fff',
        paddingVertical: 11,
        paddingHorizontal: 15
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
    }
});