import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
// REDUX
import { store } from '../redux/Store';
// PAGES
import UpcomingScreen from './upcoming';
import WalletScreen from './wallet';
import AccountScreen from './account';
import OngoingScreen from './ongoing';
import ReferScreen from './refer';
import AccountEdit from './acountEdit';
import AboutScreen from './about';
import ContactScreen from './contact';
import TermsScreen from './policy';
import joinMatch from './joinMatch';
import matchDetails from './matchDetails';
import KycScreen from './kyc';
import ResultsScreen from './results';
import NotificationPage from './notifications';
import UpdateScreen from './update'
import OtpScreen from './phoneVerification';
import OfflineScreen from './offline';
import ReferredScreen from './referList';
import MyMatchesScreen from './myMatches';
// TAB NAVIGATOR
export const Tabs = createBottomTabNavigator({
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

// STACKS
export default MainApp = createStackNavigator({
    Tabs: { screen: Tabs },
    AccountEdit: { screen: AccountEdit },
    About: { screen: AboutScreen },
    Support: { screen: ContactScreen },
    Policy: { screen: TermsScreen },
    joinMatch: { screen: joinMatch },
    MatchDetails: { screen: matchDetails },
    Kyc: {screen: KycScreen},
    Results: { screen: ResultsScreen },
    Notifications: { screen: NotificationPage },
    Update: { screen: UpdateScreen },
    Otp: { screen: OtpScreen },
    Offline: { screen: OfflineScreen },
    myRefers: { screen: ReferredScreen },
    myMatches: { screen: MyMatchesScreen }
  },{
    initialRouteName: "Tabs",
    headerMode: 'none'
});

const styles = StyleSheet.create({
    activeTabText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 11,
    }
});