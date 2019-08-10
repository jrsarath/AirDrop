import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// PAGES
import UpcomingScreen from './upcoming';
import WalletScreen from './wallet';
import AccountScreen from './account';
import OngoingScreen from './ongoing';


export default MainApp = createBottomTabNavigator({
        Ongoing: {
            screen: OngoingScreen,
        },
        Matches: {
            screen: UpcomingScreen
        },
        Wallet: {
            screen: WalletScreen,
        },
        Account: {
            screen: AccountScreen,
        }
    },{
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused }) => {
                const { routeName } = navigation.state;
                switch (routeName) {
                    case "Ongoing":
                        return focused ? null : (<Text style={styles.activeTabText}>Ongoing</Text>);
                        break;
                    case "Matches":
                        return focused ? null : (<Text style={styles.activeTabText}>Upcoming</Text>);
                        break;
                    case "Wallet":
                        return focused ? null : (<Text style={styles.activeTabText}>Wallet</Text>);
                        break;
                    case "Account":
                        return focused ? null : (<Text style={styles.activeTabText}>Account</Text>);
                        break;
                    default:
                        return null;
                        break;
                }
            },
            tabBarIcon: ({ tintColor, focused }: any) => {
                const { routeName } = navigation.state;
                switch (routeName) {
                    case "Ongoing":
                        return focused ? (
                            <MyIcon color={tintColor} name="clock" size={30} config={IcomoonConfig} />
                        ) : 
                            <MyIcon color={tintColor} name="clock" size={20} config={IcomoonConfig} />
                        ;
                        break;
                    case "Matches":
                        return focused ? (
                            <MyIcon color={tintColor} name="console" size={30} config={IcomoonConfig} />
                        ) : 
                            <MyIcon color={tintColor} name="console" size={20} config={IcomoonConfig} />
                        ;
                        break;
                    case "Wallet":
                        return focused ? (
                            <MyIcon color={tintColor} name="wallet" size={30} config={IcomoonConfig} />
                        ) : 
                            <MyIcon color={tintColor} name="wallet" size={20} config={IcomoonConfig} />
                        ;
                        break;
                    case "Account":
                        return focused ? (
                            <MyIcon color={tintColor} name="man" size={30} config={IcomoonConfig} />
                        ) : 
                            <MyIcon color={tintColor} name="man" size={20} config={IcomoonConfig} />
                        ;
                        break;
                    default:
                        return null;
                        break;
                }
            }
        }),
        tabBarOptions: {
            activeTintColor: '#f44336',
            inactiveTintColor: 'gray',
            style: {
                height: 60,
                paddingVertical:10,
            },
            iconStyle: {
                padding:0
            }
        },
    }
);

const styles = StyleSheet.create({
    activeTabText: {
        color: '#4a4a4a',
        textAlign: 'center',
        fontSize: 11,
    }
});