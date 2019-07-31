import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENT
import Header from '../component/header';

export class addMoney extends Component {
    constructor(){
        super();
        this.state = {
            addMoney: null
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
                <TouchableOpacity style={styles.button}>
                    <Text style={{color: '#fff',fontSize: 18}}>Add Money</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export class withdrawMoney extends Component {
    constructor(){
        super();
        this.state = {
            withdrawMoney: null,
            withdrawNumber: null,
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

export default class WalletScreen extends Component {
    render() {
        return(
            <Screen>
                <Header text='Game Setter' />
                <View style={styles.header}>
                    <Image style={styles.icon} source={require('../images/wallet.png')} />
                    <Text style={styles.moneyText}>₹ 1400</Text>
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
        padding: 15,
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