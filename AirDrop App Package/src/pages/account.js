import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Linking } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENT
import Header from '../component/header';
import Loading from '../component/loader';
// REDUX 
var md5 = require('js-md5');
import config from '../config/config.js'
import { SignIn } from '../redux/Actions/Actions';
import { store } from '../redux/Store';

export default class AccountScreen extends Component {
    constructor(){
        super();
        this.state = {
            loading: true,
            btnProfile: 'Update Profile',
            btnPassword: 'Update Password',
            name: null,
            gamertag: null,
            phone: null,
            bank: null,
            bankHolder: null,
            bankName:null,
            bankIfsc:null,
            paytm: null,
            googlepay: null,
            amazonpay: null,
            oldPassword: null,
            password: null,
            newPassword: null
        }
    }
    componentDidMount() {
        this.props.navigation.addListener('willFocus', (route) => {
            this._getProfile();
        });   
    }
    _getProfile(){
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
                console.log(resJson);
                this.setState({
                    loading: false,
                    name: resJson.name,
                    phone: resJson.phone,
                    paytm: resJson.paytm,
                    googlepay: resJson.googlepay,
                    amazonpay: resJson.amazonpay,
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
        this.setState({
            btnProfile: 'Please Wait...'
        });
        if (this.state.name != null && this.state.gamertag != null) {
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
                        gamertag: this.state.gamertag,
                        phone: this.state.phone,
                        bank: this.state.bank+","+this.state.bankHolder+","+this.state.bankName+","+this.state.bankIfsc,
                        paytm: this.state.paytm,
                        googlepay: this.state.googlepay,
                        amazonpay: this.state.amazonpay
                    })
                })
                .then((response) => response.json())
                .then((resJson) => {
                    if (resJson.status == 'success') {
                        ToastAndroid.show('Profile Updated Successfully  ', ToastAndroid.LONG);
                        store.dispatch(SignIn({
                            email: store.getState().user,
                            userData: {
                                name: this.state.name,
                                phone: this.state.phone,
                                gamertag: this.state.gamertag
                            }
                        }));
                    } else {
                        ToastAndroid.show('Error Updating Profile', ToastAndroid.LONG);
                    }
                    this.setState({
                        btnProfile: 'Update Profile'
                    });
                })
                .catch((error) => {
                    console.error(error);
                    ToastAndroid.show('Error Updating Profile', ToastAndroid.LONG);
                    this.setState({
                        btnProfile: 'Try Again'
                    });
                });
        } else {
            ToastAndroid.show('Please Enter All Info', ToastAndroid.LONG);
            this.setState({
                btnProfile: 'Try Again'
            });
        }
    }
    updatePassword(){
        this.setState({
            btnPassword: 'Please Wait...'
        });
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
                        this.setState({
                            btnPassword: 'Update Password'
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        ToastAndroid.show('Error Updating Password', ToastAndroid.LONG);
                        this.setState({
                            btnPassword: 'Try Again'
                        });
                    });
            } else {
                ToastAndroid.show('Your Old & New Password Doesnt Match', ToastAndroid.LONG);
                this.setState({
                    btnPassword: 'Try Again'
                });
            }
        } else {
            ToastAndroid.show('Please enter Both Old & New Password', ToastAndroid.LONG);
            this.setState({
                btnPassword: 'Try Again'
            });
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
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            value={this.state.name}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ name: text })}
                            placeholder='Your Name'
                        />
                        <Text style={styles.label}>Phone Number (10 Digit)</Text>
                        <TextInput
                            value={this.state.phone}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ phone: text })}
                            placeholder='Your Phone Number'
                        />
                        <Text style={styles.label}>PUBGM Username</Text>
                        <TextInput
                            value={this.state.gamertag}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ gamertag: text })}
                            placeholder='Your PUBGM username'
                        />
                        <Text style={styles.label}>Paytm Number (10 Digit)</Text>
                        <TextInput
                            value={this.state.paytm}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ paytm: text })}
                            placeholder='Your Paytm Number'
                        />
                        <Text style={styles.label}>Google Pay Number (10 Digit)</Text>
                        <TextInput
                            value={this.state.googlepay}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ googlepay: text })}
                            placeholder='Your Google Pay Number'
                        />
                        <Text style={styles.label}>Amazon Pay ID</Text>
                        <TextInput
                            value={this.state.amazonpay}
                            style={styles.input}
                            onChangeText={(text) => this.setState({ amazonpay: text })}
                            placeholder = 'Your Amazon Pay ID'
                        />

                        <TouchableOpacity style={styles.button} onPress={() => this.updateProfile()}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{this.state.btnProfile}</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18 }}>{this.state.btnPassword}</Text>
                        </TouchableOpacity>
                        <View style={styles.textCon}>
                            <Title style={{color:'#f44336'}}>Support Info</Title>
                            <TouchableOpacity onPress={() => Linking.openURL("tel:+916361298431")}>
                                <Subtitle style={{color:'#4a4a4a'}}>
                                    Phone: +91 63612 98431
                                </Subtitle>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL("http://api.whatsapp.com/send?phone=916361298431")}>
                                <Subtitle style={{color:'#4a4a4a'}}>
                                    WhatsApp: +91 63612 98431
                                </Subtitle>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL("mailto:support@gamesetter.in")}>
                                <Subtitle style={{color:'#4a4a4a'}}>
                                    support@gamesetter.in
                                </Subtitle>
                            </TouchableOpacity>
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
    },
    label: {
        marginLeft: 20,
        marginBottom: 5,
        marginTop:5,
        color: '#9e9e9e',
        fontSize: 14
    }
});