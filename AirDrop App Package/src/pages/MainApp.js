import React, { Component } from 'react';
import MyIcon from "react-native-custom-icon";
import IcomoonConfig from '../assets/icomoon/selection.json';
import { createBottomTabNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// PAGES
import UpcomingScreen from './upcoming';
import WalletScreen from './wallet';
import AccountScreen from './account';
import OngoingScreen from './ongoing';
import PolicyScreen from './policy';
import ContactScreen from './contact';
import AboutScreen from './about';
import LogoutScreen from './logout';
// REDUX
import config from '../config/config.js'
import { GetOngoing } from '../redux/Actions/Actions';
import { store } from '../redux/Store';

// TAB NAVIGATOR
export const MainTabs = createBottomTabNavigator({
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
});

// DRAWER NAVIGATOR
const DrawerContent = (props) => (
  <ScrollView>
    <View style={{flex:1,alignItems:'center',paddingBottom:10,paddingTop:20}}>
    </View>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems  {...props} style={{fontSize:15,padding:0}} />
    </SafeAreaView>
  </ScrollView>
);

export default MainApp = createDrawerNavigator({
    Home: { screen: MainTabs,
            navigationOptions: {
              drawerLabel: () => null
            }},
    Account: { screen: AccountScreen,
            navigationOptions: {
              drawerLabel: 'Account',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="user" size={20}/>
              ),
            }},
    Wallet: { screen: WalletScreen,
            navigationOptions: {
              drawerLabel: 'Wallet',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="credit-card" size={20}/>
              ),
            }},
    About: { screen: AboutScreen,
            navigationOptions: {
              drawerLabel: 'About Us',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="info" size={20}/>
              ),
            }},
    Contact: { screen: ContactScreen,
            navigationOptions: {
              drawerLabel: 'Contact Us',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="phone" size={20}/>
              ),
            }},
    Policies: { screen: PolicyScreen,
            navigationOptions: {
              drawerLabel: 'Policies',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="file-text" size={20}/>
              ),
            }},
    Logout: { screen: LogoutScreen,
            navigationOptions: {
              drawerLabel: 'Logout',
              drawerIcon: ({tintColor, focused}) => (
                <Icon style={{color: tintColor}} name="power" size={20}/>
              ),
            }},
 },{
    initialRouteName: "Contact",
    activeTintColor: '#f44336',
    inactiveTintColor: 'grey',
    contentOptions: {
      labelStyle: {
        fontSize:15,
        fontWeight: 'normal'
      }
    },
    contentComponent: DrawerContent
});

const styles = StyleSheet.create({
    activeTabText: {
        color: '#4a4a4a',
        textAlign: 'center',
        fontSize: 11,
    }
});