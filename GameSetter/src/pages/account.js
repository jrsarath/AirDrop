import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENT
import Header from '../component/header';
// REDUX 
import config from '../config/config.js'
import { GetOngoing } from '../redux/Actions/Actions';
import { store } from '../redux/Store';

export default class AccountScreen extends Component {
    constructor(){
        super();
        this.state = {
            name: null,
            number: null,
            gamertag: null,
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
                console.log(resJson);
                this.setState({
                    name: resJson.name,
                    number: resJson.phone,
                    gamertag: resJson.gamertag
                })
            })
            .catch((error) => {
                console.error(error);
                ToastAndroid.show('Error Fetching Profile', ToastAndroid.LONG);
            });
    }
    render() {
        return(
            <Screen>
                <Header text='Game Setter' />
                <View style={styles.base}>
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
                            value={this.state.number}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ number: text })}
                            placeholder='Your Paytm Number'
                        />
                        <TextInput
                            value={this.state.gamertag}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ gamertag: text })}
                            placeholder='Your PUBGM username'
                        />
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
                    </View>
                </View>
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
        paddingHorizontal: 20,
        paddingVertical: 10
    },  
    container: {
        height: '100%',
        width: '100%',
        marginTop: 10
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
        padding: 13,
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