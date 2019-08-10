import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { StyleSheet, TouchableOpacity, View, ScrollView, TextInput, ToastAndroid, ImageBackground, Platform, DeviceEventEmitter, NativeModules, NativeEventEmitter, Alert } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENT
import Header from '../component/header';
// REDUX
import config from '../config/config.js'
import { GetWallet } from '../redux/Actions/Actions';
import { store } from '../redux/Store';
// PAYU
import paytm from '@philly25/react-native-paytm';
import PayuMoney from 'react-native-payumoney';
let sandbox = true;
let id = sandbox == true ? "MfaUR5to": "MfaUR5to"; // PAYU Merchant ID here
let key = sandbox == true ? "9KfDBmH40i" : "9KfDBmH40i"; // PAYU Key Here


// ADD MONEY TAB
export class addMoney extends Component {
    constructor(){
        super();
        this.emitter = null;
        this.state = {
            addMoney: null,
            order_id: null,
        }
    }
    componentDidMount() {
        // PAYTM EVENTS
        paytmEvent = new NativeEventEmitter(NativeModules.RNPayTm);
        paytmEvent.addListener('PayTMResponse', this._handlePaytmResponse);
    }
    componentWillUnmount() {
        // PAYTM EVENTS
        if (paytmEvent) {
            paytmEvent.removeListener('PayTMResponse', this._handlePaytmResponse);
            paytmEvent = null;
        }
    }

    // INITIATE PAYTM PAYMENT
    startPayment(){
        fetch(config.domain + "api/payment.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                action: "paymentRequest",
                user: store.getState().user,
                amount: this.state.addMoney
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched');
                this.setState({order_id: data.ORDER_ID});
                var details = {
                    mode: 'Staging',
                    ORDER_ID: data.ORDER_ID,
                    MID: data.MID,
                    INDUSTRY_TYPE_ID: data.INDUSTRY_TYPE_ID, //Prod
                    WEBSITE: data.WEBSITE, //prod
                    CHANNEL_ID: data.CHANNEL_ID,
                    TXN_AMOUNT: data.TXN_AMOUNT,
                    EMAIL: data.EMAIL,
                    MOBILE_NO: data.MOBILE_NO,
                    CUST_ID: data.CUST_ID,
                    CHECKSUMHASH: data.CHECKSUM,
                    CALLBACK_URL: data.CALLBACK_URL,
                };
                paytm.startPayment(details);
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Error', 'Unable to initiate transaction, please try again');
            });
    }
    // HANDLE PAYTM CALLBACKS AND VERIFY, UPDATE USERS WALLET
    _handlePaytmResponse = (resp) => {
        const { STATUS, status, response } = resp;
        if (STATUS && STATUS === 'TXN_SUCCESS') {
            fetch(config.domain + "api/payment.php", {
                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    "Accept-Encoding": "gzip, deflate",
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    action: "verifyPayment",
                    order_id: this.state.order_id,
                    user: store.getState().user
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == "success") {
                        store.dispatch(GetWallet(data.balance));
                        Alert.alert('Transaction successful', 'We have added money to your account, Enjoy playing');
                    } else {
                        Alert.alert('Failed', 'Unable to complete transaction, please check your bills. In case of any query you can contact us');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    Alert.alert('Error', 'Unable to complete transaction, please check your bills. In case of any query you can contact us');
                });
        } else {
            Alert.alert('Error', 'Unable to complete transaction, please check your bills. In case of any query you can contact us');
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    value={this.state.addMoney}
                    style={styles.input}
                    onChangeText={(text) => this.setState({ addMoney: text })}
                    placeholder='Amount to Add'
                />
                <TouchableOpacity style={styles.button} onPress={() => this.startPayment()}>
                    <Text style={{color: '#fff',fontSize: 18}}>Add Money</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// WITHDRAW MONEY TAB
export class withdrawMoney extends Component {
    constructor(){
        super();
        this.emitter = null;
        this.state = {
            withdrawMoney: null,
            withdrawNumber: null,
        }
    }
    componentDidMount() {
        paytmEvent = new NativeEventEmitter(NativeModules.RNPayTm);
        paytmEvent.addListener('PayTMResponse', this._handlePaytmResponse);
    }
    componentWillUnmount() {
        if (paytmEvent) {
            paytmEvent.removeListener('PayTMResponse', this._handlePaytmResponse);
            paytmEvent = null;
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.addMoney}
                    style={styles.input}
                    onChangeText={(text) => this.setState({ withdrawMoney: text })}
                    placeholder='Paytm Number'
                />
                <TextInput
                    value={this.state.addMoney}
                    style={styles.input}
                    onChangeText={(text) => this.setState({ withdrawNumber: text })}
                    placeholder='Amount to Withdraw'
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Withdraw Money</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// TAB COMBINED COMPONENET
const tab = createMaterialTopTabNavigator({
    Add: addMoney,
    Withdraw: withdrawMoney
},{
    tabBarOptions: {
        style: {
            backgroundColor: '#23283a',
            color: '#fff'        
        }
    }
});
export const Tabs = createAppContainer(tab);


// ACTUALL WALLET SCREEN
export default class WalletScreen extends Component {
    constructor(){
        super();
        this.state = {
            balance: 0
        }
    }
    
    componentDidMount() {
        this.props.navigation.addListener('willFocus', (route) => {
            this._getWalletBalance();
        });
        store.subscribe(() => {
            this.setState({
                balance: store.getState().wallet
            })
        })
    }
    _getWalletBalance(){
        fetch(config.domain + "api/payment.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                action: "getWallet",
                user: store.getState().user
            })

        })
        .then((response) => response.json())
        .then((data) => {
            store.dispatch(GetWallet(data.balance));
        })
        .catch((error) => {
            console.error(error);
            ToastAndroid.show('Error Fetching Wallet & Balance', ToastAndroid.LONG);
        });
    }
    render() {
        return(
            <Screen>
                <Header text='Game Setter' />
                <View style={styles.header}>
                    <Image style={styles.icon} source={require('../images/wallet.png')} />
                    <Text style={styles.moneyText}>₹ {this.state.balance}</Text>
                </View>
                <Tabs />
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#23283a',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row'
    },
    icon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 20
    },
    moneyText: {
        color: "#fff",
        fontSize: 50,
        marginTop: 8
    },
    container: {
        height: '100%',
        textAlign: 'center',
        justifyContent: 'center'
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