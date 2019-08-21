import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { Title, Subtitle } from '@shoutem/ui';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
// PAGES
import UpcomingScreen from './upcoming';
import WalletScreen from './wallet';
import AccountScreen from './account';
import OngoingScreen from './ongoing';
import ReferScreen from './refer';

// TAB NAVIGATOR
export default MainApp = createBottomTabNavigator({
        Refer: {
          screen: ReferScreen,
        },
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
        initialRouteName: "Matches",
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused }) => {
                const { routeName } = navigation.state;
                switch (routeName) {
                  case "Refer":
                        return focused ? null : (<Text style={styles.activeTabText}>Earn</Text>);
                        break;
                    case "Ongoing":
                        return focused ? null : (<Text style={styles.activeTabText}>Ongoing</Text>);
                        break;
                    case "Matches":
                        return focused ? null : (<Text style={styles.activeTabText}>Play</Text>);
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
                    case "Refer":
                        return focused ? (
                            <Icon color={tintColor} name="rupee" size={32} />
                        ) : 
                            <Icon color={tintColor} name="rupee" size={20} />
                        ;
                        break;
                    case "Ongoing":
                        return focused ? (
                            <MyIcon color={tintColor} name="clock" size={32} config={IcomoonConfig} />
                        ) : 
                            <MyIcon color={tintColor} name="clock" size={20} config={IcomoonConfig} />
                        ;
                        break;
                    case "Matches":
                        return focused ? (
                            <MyIcon color={tintColor} name="console" size={32} config={IcomoonConfig} />
                        ) : 
                            <MyIcon color={tintColor} name="console" size={20} config={IcomoonConfig} />
                        ;
                        break;
                    case "Wallet":
                        return focused ? (
                            <MyIcon color={tintColor} name="wallet" size={32} config={IcomoonConfig} />
                        ) : 
                            <MyIcon color={tintColor} name="wallet" size={20} config={IcomoonConfig} />
                        ;
                        break;
                    case "Account":
                        return focused ? (
                            <MyIcon color={tintColor} name="man" size={32} config={IcomoonConfig} />
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
            activeTintColor: '#ffc50c',
            inactiveTintColor: '#fff',
            style: {
                height: 60,
                paddingVertical:10,
                backgroundColor: '#10102d',
            },
            iconStyle: {
                padding:0
            }
        },
});

const styles = StyleSheet.create({
    activeTabText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 11,
    }
});