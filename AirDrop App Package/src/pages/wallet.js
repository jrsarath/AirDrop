import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { withNavigation, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { StyleSheet, TouchableOpacity, View, ScrollView, TextInput, ToastAndroid, ImageBackground, Platform, DeviceEventEmitter, NativeModules, NativeEventEmitter, Alert, Picker } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';
// CUSTOM COMPONENT
import Header from '../component/header';
import Loading from '../component/loader';
import Chat from '../component/chatButton';
// REDUX
import config from '../config/config.js'
import { GetWallet, GetTransactions } from '../redux/Actions/Actions';
import { store } from '../redux/Store';
// PAYU
import paytm from '@philly25/react-native-paytm';
import PayuMoney from 'react-native-payumoney';
let sandbox = false;
let PAY_MID = sandbox == true ? "4934580":"6775713"; // PAYU Merchant ID here
let PAY_MKEY = sandbox == true ? "rjQUPktU":"MfaUR5to"; // PAYU Key Here


// ADD MONEY TAB
export class addMoney extends Component {
    constructor(){
        super();
        this.emitter = null;
        this.state = {
            addMoney: '',
            order_id: null,
            text: 'Add Money',
            color: '#f44336',
            val: false,
        }
    }
    
    // INITIATE PAYTM PAYMENT
    startPayment(){
        if (this.state.addMoney != ''){
            if (!this.state.val) {
                this.setState({
                    text: 'Please Wait...',
                    color: '#bdbdbd'
                });
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
                            this.setState({
                                text: 'Done',
                                color: '#4caf50'
                            });
                            setTimeout(() => {
                                this.setState({
                                    text: 'Add Money',
                                    color: '#f44336'
                                });
                            }, 3000);
                            Alert.alert('Transactions Successful', 'We have added the balance to your Wallet, Keep gaming..');
                        }).catch(e => {
                            console.log(e); //In case of failture
                            Alert.alert('Error', 'Unable to complete transaction, please check your bills. In case of any query you can contact us');
                            this.setState({
                                text: 'Try Again',
                                color: '#f44336'
                            });
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        Alert.alert('Error', 'Unable to initiate transaction, please try again');
                        this.setState({
                            text: 'Try Again',
                            color: '#f44336'
                        });
                    });
            } else {
                ToastAndroid.show('Please enter a Valid Amount', ToastAndroid.LONG);
            }
        } else {
            ToastAndroid.show('Please enter Amount', ToastAndroid.LONG);
            this.setState({
                text: 'Try Again',
                color: '#f44336'
            });
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
            store.dispatch(GetWallet({
                wallet: data.balance,
                bonus: data.bonus
            }));
        })
        .catch((error) => {
            console.error(error);
            ToastAndroid.show('Error Fetching Wallet & Balance', ToastAndroid.LONG);
        });
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.inputCon}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            keyboardType={'numeric'}
                            value={this.state.addMoney}
                            placeholder='Amount to Add'
                            onChangeText={(text) => {
                                    this.setState({ addMoney: text });
                                    var reg = /^[0-9]*$/;
                                    !reg.test(text) ? this.setState({val: true}) : this.setState({val: false}); 
                                }
                            }
                        />
                        {this.state.val ? <Icon name='x' color='#f44336' size={30} style={styles.errorIcon} /> : null}
                    </View>
                    {this.state.val ? <Text style={styles.errorText}>Please enter a Valid Amount</Text> : null}
                </View>
                <TouchableOpacity style={[styles.button, {backgroundColor: this.state.color}]} onPress={() => this.startPayment()}>
                    <Text style={{color: '#fff',fontSize: 18}}>{this.state.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// WITHDRAW MONEY TAB
export class withdrawMoney extends Component {
    constructor(props){
        super(props);
        this.emitter = null;
        this.state = {
            val: '',
            withdrawAmount: '',
            withdrawMethod: 'paytm',
            color: store.getState().wallet <= 0 ? '#bdbdbd' : '#f44336',
            text: 'Withdraw',
            action: store.getState().wallet <= 0 ? null : () => this._withdrawMoney()
        }
    }
    componentDidMount(){
        store.subscribe(() => {
            this.setState({
                color: store.getState().wallet <= 0 ? '#bdbdbd' : '#f44336',
                action: store.getState().wallet <= 0 ? null: () => this._withdrawMoney()
            })
        })
    }
    _withdrawMoney(){
        if (this.state.withdrawAmount != '') {
            if (store.getState().userData.docverified == "true" && store.getState().userData.pVerified == "true") {
                if (!this.state.val) {
                    this.setState({
                        text: 'Please Wait...',
                        color: '#bdbdbd'
                    });
                    if ((+store.getState().wallet - 10) >= +this.state.withdrawAmount) {
                        fetch(config.domain + "api/payment.php", {
                                method: 'POST',
                                headers: new Headers({
                                    'Accept': 'application/json',
                                    "Accept-Encoding": "gzip, deflate",
                                    'Content-Type': 'application/json'
                                }),
                                body: JSON.stringify({
                                    action: "withdraw",
                                    user: store.getState().user,
                                    amount: this.state.withdrawAmount,
                                    gateway: this.state.withdrawMethod
                                })

                            })
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.status == 'success') {
                                    Alert.alert('Request Recieved', 'We got your withdraw request for ₹' + this.state.withdrawAmount + ', we will proccess it shortly. \n\nRequest ID: ' + data.txnid);
                                    this._getWalletBalance();
                                    this.setState({
                                        text: 'Done',
                                        color: '#4caf50'
                                    });
                                    setTimeout(() => {
                                        this.setState({
                                            text: 'Withdraw',
                                            color: '#f44336'
                                        });
                                    }, 3000);
                                } else if (data.status == 'not-enough') {
                                    Alert.alert('Not enough Balance', 'We could not complete your request. Reach support team if you think this is a mistake');
                                    this.setState({
                                        text: 'Try Again',
                                        color: '#f44336'
                                    })
                                } else {
                                    ToastAndroid.show('Error submitting request! Try again later', ToastAndroid.LONG);
                                    this.setState({
                                        text: 'Try Again',
                                        color: '#f44336'
                                    })
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                ToastAndroid.show('Error submitting request! Try again later', ToastAndroid.LONG);
                                this.setState({
                                    text: 'Try Again',
                                    color: '#f44336'
                                })
                            });
                    } else {
                        ToastAndroid.show('Not enough Balance!', ToastAndroid.LONG);
                        this.setState({
                            text: 'Try Again',
                            color: '#f44336'
                        })
                    }
                } else {
                    ToastAndroid.show('Please enter a Valid Amount', ToastAndroid.LONG);
                }
            } else if (store.getState().userData.docverified == "pending") {
                Alert.alert('KYC Pending', 'We are currently proccessing your KYC request. Kindly wait and try again after some time.');
            } else {
                if (store.getState().userData.pVerified == "false") {
                    ToastAndroid.show('Please verify your mobile No First', ToastAndroid.LONG);
                    this.props.screenProps.nav.navigate("Otp");
                } else {
                    ToastAndroid.show('Please Complete KYC to withdraw funds', ToastAndroid.LONG);
                    this.props.screenProps.nav.navigate("Kyc");
                }
            }
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
            store.dispatch(GetWallet({
                wallet: data.balance,
                bonus: data.bonus
            }));
        })
        .catch((error) => {
            console.error(error);
            ToastAndroid.show('Error Fetching Wallet & Balance', ToastAndroid.LONG);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputCon}>
                    <View style={styles.inputWrapper}>
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
                    </View>
                </View>

                <View style={styles.inputCon}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            keyboardType={'numeric'}
                            value={this.state.withdrawAmount}
                            placeholder='Amount to Add'
                            onChangeText={(text) => {
                                    this.setState({ withdrawAmount: text });
                                    var reg = /^[0-9]*$/;
                                    !reg.test(text) ? this.setState({val: true}) : this.setState({val: false}); 
                                }
                            }
                        />
                        {this.state.val ? <Icon name='x' color='#f44336' size={30} style={styles.errorIcon} /> : null}
                    </View>
                    {this.state.val ? <Text style={styles.errorText}>Please enter a Valid Amount</Text> : null}
                </View>

                <TouchableOpacity style={[styles.button, {backgroundColor: this.state.color}]} onPress={this.state.action}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>{this.state.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// TRANSACTIONS TAB
export class Transactions extends Component {
    constructor(){
        super();
        this.state = {
            transactions: store.getState().transactions
        }
    }
    componentDidMount() {
        store.subscribe(() => {
            this.setState({
                transactions: store.getState().transactions
            })
        });
        fetch(config.domain + "api/payment.php", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                "Accept-Encoding": "gzip, deflate",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                action: "transactions",
                user: store.getState().user
            })

        })
        .then((response) => response.json())
        .then((data) => {
            store.dispatch(GetTransactions(data));
        })
        .catch((error) => {
            console.error(error);
            ToastAndroid.show('Error Fetching Wallet & Balance', ToastAndroid.LONG);
        });
    }
    render() {
        let TranList = this.state.transactions.map((tr, id) => {
            if (tr.status == 'SUCCESS') {
                icon = 'check';
                iconColor = '#4caf50';
            } else if (tr.status == 'PENDING') {
                icon = 'watch';
                iconColor = '#ffc107';
            } else {
                icon = 'x';
                iconColor = '#f44336';
            }
            if (tr.type == 'CREDIT' || tr.type == 'REFER-CREDIT' || tr.type == 'REFUND') {
                iconMode = 'plus-circle';
                iconModeColor = '#4caf50';
            } else {
                iconMode = 'minus-circle';
                iconModeColor = '#f44336';
            }
            return(
                <View style={styles.tranCon} key={id}>
                    <Icon style={{width:30}}name={icon} size={30} color={iconColor}/>
                    <Text style={{marginLeft:5, flexGrow:2, textAlign: 'center'}}>₹ {tr.amount}</Text>
                    <Text style={{marginLeft:15, flexGrow:3}}>ID: {tr.id}</Text>
                    <Icon style={[styles.iconRight, {width:30}]} name={iconMode} size={30} color={iconModeColor}/>
                </View>
            );
        })
        return(
            <ScrollView style={{marginVertical:10}}>
                {TranList}
            </ScrollView>
        )
    }
}

// TAB COMBINED COMPONENET
const tab = createMaterialTopTabNavigator({
    Add: addMoney,
    Withdraw: withdrawMoney,
    History: Transactions
 },{
    initialRouteName: "Add",
    tabBarOptions: {
        style: {
            backgroundColor: '#10102d',
            color: '#fff'  
        },
        labelStyle: {
            fontSize: 12,
            fontWeight: 'bold'
        },
        tabStyle: {
            paddingHorizontal: 0
        }
    }
});
export const Tabs = createAppContainer(tab);

// ACTUALL WALLET SCREEN
export default class WalletScreen extends Component {
    constructor(){
        super();
        this.state = {
            balance: store.getState().wallet,
            bonus: store.getState().bonus,
            loading: false,
        }
    }
    
    componentDidMount() {
        this.props.navigation.addListener('willFocus', (route) => {
            this._getWalletBalance();
        });
        store.subscribe(() => {
            this.setState({
                balance: store.getState().wallet,
                bonus: store.getState().bonus,
            })
        })
    }
    _getWalletBalance(){
        if (this.state.loading == false) {
            ToastAndroid.show('Refreshing Wallet', ToastAndroid.SHORT);
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
            store.dispatch(GetWallet({
                wallet: data.balance,
                bonus: data.bonus
            }));
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
                    <View style={{flexDirection: 'row'}}>
                        <Image style={styles.icon} source={require('../images/wallet.png')} />
                        <Text style={styles.moneyText}>₹ {this.state.balance}</Text>
                    </View>
                    <View>
                        <Text style={{color:'#fff',marginTop:10}}>Bonus Wallet : ₹ {this.state.bonus}</Text>
                    </View>
                </View>
                <Tabs screenProps={{ nav: this.props.navigation }}/>
                <Chat />
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#10102d',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column'
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
        height: 50,
        color: '#ffffff',
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44336',
        marginHorizontal: 20
    },
    tranCon: { 
        borderRadius: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin:5,
        marginHorizontal: 10,
        padding: 10,
        elevation: 3
    },
    iconRight: {
        position: 'absolute',
        right: 10
    }
});