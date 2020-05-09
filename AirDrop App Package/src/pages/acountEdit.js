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

export default class AccountEdit extends Component {
    constructor(){
        super();
        this.state = {
            loading: true,
            btnProfile: 'Update Profile',
            btnPassword: 'Update Password',
            btnProfileColor: '#f44336',
            btnPasswordColor: '#f44336',
            name: '',
            gamertag: '',
            phone: '',
            bank: null,
            bankHolder: null,
            bankName:null,
            bankIfsc:null,
            paytm: null,
            googlepay: null,
            amazonpay: null,
            oldPassword: null,
            password: null,
            newPassword: null,
            val: {
                pass: false,
                phone: false,
                gpay: false,
                paytm: false,
            }
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
        if (this.state.name != '' && this.state.gamertag != '' && this.state.phone != '') {
            if (!this.state.val.phone) {
                this.setState({
                    btnProfile: 'Please Wait...',
                    btnProfileColor: '#bdbdbd'
                });
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
                            bank: this.state.bank + "," + this.state.bankHolder + "," + this.state.bankName + "," + this.state.bankIfsc,
                            paytm: this.state.paytm,
                            googlepay: this.state.googlepay,
                            amazonpay: this.state.amazonpay
                        })
                    })
                    .then((response) => response.json())
                    .then((resJson) => {
                        if (resJson.status == 'success') {
                            ToastAndroid.show('Profile Updated Successfully  ', ToastAndroid.LONG);
                            this.setState({
                                btnProfile: 'Done',
                                btnProfileColor: '#4caf50'
                            });
                            setTimeout(() => {
                                this.setState({
                                    btnProfile: 'Update Profile',
                                    btnProfileColor: '#f44336'
                                });
                            }, 3000);
                            store.dispatch(SignIn({
                                email: store.getState().user,
                                userData: {
                                    name: this.state.name,
                                    phone: this.state.phone,
                                    gamertag: this.state.gamertag,
                                    refercode: store.getState().userData.refercode,
                                    doctype: store.getState().userData.doctype,
                                    docverified: store.getState().userData.docverified,
                                }
                            }));
                        } else {
                            ToastAndroid.show('Error Updating Profile', ToastAndroid.LONG);
                            this.setState({
                                btnProfile: 'Try Again',
                                btnProfileColor: '#f44336'
                            })
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        ToastAndroid.show('Error Updating Profile', ToastAndroid.LONG);
                        this.setState({
                            btnProfile: 'Try Again',

                        });
                    });
            }
        } else {
            ToastAndroid.show('Please Enter All Required Info', ToastAndroid.LONG);
            this.setState({
                btnProfile: 'Try Again',
                btnProfileColor: '#f44336',
            });
        }
    }
    updatePassword(){
        if (this.state.password != null && this.state.newPassword != null) {
            if (!this.state.val.pass) {
                this.setState({
                    btnPassword: 'Please Wait...',
                    btnPasswordColor: '#bdbdbd'
                });
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
                                    btnPassword: 'Done',
                                    btnPasswordColor: '#4caf50'
                                });
                                setTimeout(() => {
                                    this.setState({
                                        btnPassword: 'Update Profile',
                                        btnPasswordColor: '#f44336'
                                    });
                                }, 3000);
                            } else {
                                ToastAndroid.show('Error Updating Password', ToastAndroid.LONG);
                                this.setState({
                                    btnPassword: 'Try Again',
                                    btnPasswordColor: '#f444336'
                                });
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            ToastAndroid.show('Error Updating Password', ToastAndroid.LONG);
                            this.setState({
                                btnPassword: 'Try Again',
                                btnPasswordColor: '#f444336'
                            });
                        });
                } else {
                    ToastAndroid.show('Your Old & New Password Doesnt Match', ToastAndroid.LONG);
                    this.setState({
                        btnPassword: 'Try Again',
                        btnPasswordColor: '#f444336'
                    });
                }
            } else {
                ToastAndroid.show('Please enter Valid Password', ToastAndroid.LONG);
            }
        } else {
            ToastAndroid.show('Please enter Both Old & New Password', ToastAndroid.LONG);
            this.setState({
                btnPassword: 'Try Again',
                btnPasswordColor: '#f444336'
            });
        }
    }
    render() {
        return(
            <Screen style={{backgroundColor: '#fff'}}>
                <Header text='Edit Account' />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.textCon}>
                            <Title style={{color:'#f44336'}}>Profile</Title>
                            <Subtitle style={{color:'#4a4a4a'}}>Edit and manage your profile</Subtitle>
                        </View>

                        <Text style={styles.label}>Name</Text>
                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={this.state.name}
                                    style={styles.input}
                                    onChangeText={(text) => this.setState({ name: text })}
                                    placeholder='Your Name'
                                />
                            </View>
                        </View>
                        

                        <Text style={styles.label}>Phone Number (10 Digit)</Text>
                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    maxLength={10}
                                    style={styles.input}
                                    keyboardType={'numeric'}
                                    value={this.state.phone}
                                    placeholder='Your Phone Number'
                                    autoCompleteType='tel'
                                    onChangeText={
                                        (text) => {
                                            this.setState({ phone: text });
                                            var reg = /^[6-9]\d{9}$/;
                                            !reg.test(text) ? this.setState(last => ({val: { ...last.val, phone: true}})) : this.setState(last => ({val: { ...last.val, phone: false}})); 
                                        }
                                    }
                                />
                                {this.state.val.phone ? <Icon name='x' color='#f44336' size={30} style={styles.errorIcon} /> : null}
                            </View>
                            {this.state.val.phone ? <Text style={styles.errorText}>Please enter a Valid Mobile Number</Text> : null}
                        </View>
                        

                        <Text style={styles.label}>PUBGM Username</Text>
                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={this.state.gamertag}
                                    style={styles.input}
                                    onChangeText={(text) => this.setState({ gamertag: text })}
                                    placeholder='Your PUBGM username'
                                />
                            </View>
                        </View>

                        <Text style={styles.label}>Paytm Number (10 Digit)</Text>
                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    maxLength={10}
                                    style={styles.input}
                                    keyboardType={'numeric'}
                                    value={this.state.paytm}
                                    placeholder='Your Paytm Number'
                                    onChangeText={(text) => this.setState({ paytm: text })}
                                />
                            </View>
                        </View>

                        <Text style={styles.label}>Google Pay Number (10 Digit)</Text>
                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    maxLength={10}
                                    style={styles.input}
                                    keyboardType={'numeric'}
                                    value={this.state.googlepay}
                                    placeholder='Your Google Pay Number'
                                    onChangeText={(text) => this.setState({ googlepay: text })}
                                />
                            </View>
                        </View>
                        

                        <Text style={styles.label}>Amazon Pay ID</Text>
                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={this.state.amazonpay}
                                    style={styles.input}
                                    onChangeText={(text) => this.setState({ amazonpay: text })}
                                    placeholder = 'Your Amazon Pay ID'
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={[styles.button, {backgroundColor: this.state.btnProfileColor}]} onPress={() => this.updateProfile()}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{this.state.btnProfile}</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.textCon}>
                            <Title style={{color:'#f44336'}}>Update your Password</Title>
                            <Subtitle style={{color:'#4a4a4a'}}>Always keep your password Strong and Safe</Subtitle>
                        </View>

                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={true}
                                    placeholder='Old Password'
                                    value={this.state.password}
                                    maxLength={16}
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                            </View>
                        </View>

                        <View style={styles.inputCon}>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={true}
                                    placeholder='New Password'
                                    value={this.state.newPassword}
                                    autoCompleteType='off'
                                    maxLength={16}
                                    onChangeText={
                                        (text) => {
                                            this.setState({newPassword:text});
                                            var reg = /^(?=.*\d).{4,16}$/;
                                            !reg.test(text) ? this.setState(last => ({val: { ...last.val, pass: true}})) : this.setState(last => ({val: { ...last.val, pass: false}})); 
                                        }
                                    }
                                />
                                {this.state.val.pass ? <Icon name='x' color='#f44336' size={30} style={styles.errorIcon} /> : null}
                            </View>
                            {this.state.val.pass ? <Text style={styles.errorText}>Password should be 4-16 Digits, Should contain atleast one Number</Text> : null}
                        </View>
                        
                        <TouchableOpacity style={[styles.button, {backgroundColor: this.state.btnPasswordColor}]} onPress={() => this.updatePassword()}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{this.state.btnPassword}</Text>
                        </TouchableOpacity>
                        <View style={styles.textCon}>
                            <Title style={{color:'#f44336'}}>Support Info</Title>
                            <TouchableOpacity onPress={() => Linking.openURL("mailto:support@gamesetter.in")}>
                                <Subtitle style={{color:'#4a4a4a'}}>
                                    support@gamesetter.in
                                </Subtitle>
                            </TouchableOpacity>
                        </View>
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