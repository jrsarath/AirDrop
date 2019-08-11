import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { StyleSheet, TouchableOpacity, View, ScrollView, TextInput, ToastAndroid, ImageBackground, Platform, DeviceEventEmitter, NativeModules, NativeEventEmitter, Alert, Picker } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENT
import Header from '../component/header';
import Loading from '../component/loader';
// REDUX
import config from '../config/config.js'
import { GetWallet } from '../redux/Actions/Actions';
import { store } from '../redux/Store';
// PAYU
import paytm from '@philly25/react-native-paytm';
import PayuMoney from 'react-native-payumoney';
let sandbox = true;
let PAY_MID = sandbox == true ? "4934580":"6775713"; // PAYU Merchant ID here
let PAY_MKEY = sandbox == true ? "rjQUPktU":"MfaUR5to"; // PAYU Key Here


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
    
    // INITIATE PAYTM PAYMENT
    startPayment(){
        if (this.state.addMoney != null){
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
                    console.log(data);
                    this.setState({
                        order_id: data.order_id
                    });
                    let options = {
                        amount: parseFloat(data.amount),
                        txid: data.order_id,
                        productId: data.productId,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        id: PAY_MID,
                        key: PAY_MKEY,
                        surl: data.success_url,
                        furl: data.failed_url,
                        sandbox: sandbox,
                        hash: data.hash
                    };
                    console.log(options);
                    PayuMoney.pay(options).then((d) => {
                        this._getWalletBalance();
                    }).catch(e => {
                        console.log(e); //In case of failture
                        Alert.alert('Error', 'Unable to complete transaction, please check your bills. In case of any query you can contact us');
                    });
                })
                .catch((error) => {
                    console.error(error);
                    Alert.alert('Error', 'Unable to initiate transaction, please try again');
                });
        } else {
            ToastAndroid.show('Please enter Amount', ToastAndroid.LONG);
        }
    }
    // GET WALLET BALANCE
    _getWalletBalance(){
        ToastAndroid.show('Updating Wallet Balance', ToastAndroid.SHORT);
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
            this.setState({
                loading: false,
            });
            store.dispatch(GetWallet(data.balance));
        })
        .catch((error) => {
            console.error(error);
            ToastAndroid.show('Error Fetching Wallet & Balance', ToastAndroid.LONG);
        });
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
            withdrawMethod: null,
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
                <View style={[styles.input, {padding: 4}]}>
                    <Picker
                        selectedValue={this.state.withdrawMethod}
                        onValueChange={(itemValue, itemIndex) => this.setState({withdrawMethod: itemValue})}
                    >
                        <Picker.Item label="Paytm" value="paytm" />
                        <Picker.Item label="Google Pay" value="googlepay" />
                        <Picker.Item label="Amazon Pay" value="amazonpay"/>
                    </Picker>
                </View>
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
            balance: 0,
            loading: true,
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
        if (this.state.loading == false) {
            ToastAndroid.show('Updating Wallet Balance', ToastAndroid.SHORT);
        }
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
            this.setState({
                loading: false,
            });
            store.dispatch(GetWallet(data.balance));
        })
        .catch((error) => {
            console.error(error);
            ToastAndroid.show('Error Fetching Wallet & Balance', ToastAndroid.LONG);
        });
    }
    render() {
        if (this.state.loading){
            return(
                <Screen>
                    <Header text='Game Setter' />
                    <Loading text='Refreshing Wallet' />
                </Screen>
            );
        }
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
        overflow: 'hidden',
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