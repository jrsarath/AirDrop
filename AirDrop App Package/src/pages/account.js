import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Linking, Share } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen } from '@shoutem/ui';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import RNRestart from 'react-native-restart';
import Modal from "react-native-modal";
// CUSTOM COMPONENT
import Header from '../component/header';
import Loading from '../component/loader';
// REDUX 
var md5 = require('js-md5');
import config from '../config/config.js'
import { store, persistor } from '../redux/Store';

export default class AccountScreen extends Component{
    constructor(){
        super();
        this.state = {
            modal: false,
            name: store.getState().userData.name,
            gamertag: store.getState().userData.gamertag,
            balance: store.getState().wallet
        };
    }
    componentDidMount() {
        //this._showKycModal();
        store.subscribe(() => {
            this.setState({
                name: store.getState().userData.name,
                gamertag: store.getState().userData.gamertag,
                balance: store.getState().wallet
            })
        })
    }
    _showKycModal() {
        if (store.getState().userData.docverified == 'false') {
            this.setState({
                modal: true
            })
        }
    }
    _logout() {
        persistor.purge()
            .then(RNRestart.Restart());
    }
    _share(){
        Share.share({
            message: 'Game Setter | Earn some extra cash by playing PUBG, Download Today and get Rs. 10 Bonus \n https://gamesetter.in/Gamesetter.apk',
            url: 'https://gamesetter.in/Gamesetter.apk' // TO BE CHANGED
        });
    }
    render(){
        if (store.getState().userData.docverified == 'false') {
            KYC =   <TouchableOpacity onPress={() => this.props.navigation.navigate('Kyc')} style={styles.listItem}>
                        <Image style={styles.listIcon} source={require('../images/contract.png')} />
                        <Text style={styles.listLabel}>Complete KYC</Text>
                        <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                    </TouchableOpacity>
        } else if (store.getState().userData.docverified == 'pending') {
            KYC = <TouchableOpacity style={[styles.listItem, {backgroundColor:'#fff59d'}]}>
                        <Image style={styles.listIcon} source={require('../images/hourglass.png')} />
                        <Text style={styles.listLabel}>KYC is being processed</Text>
                    </TouchableOpacity>
        } else {
            KYC = <TouchableOpacity style={[styles.listItem, {backgroundColor:'#a5d6a7'}]}>
                      <Image style={styles.listIcon} source={require('../images/check.png')} />
                      <Text style={styles.listLabel}>KYC Verified</Text>
                  </TouchableOpacity>
        }
        
        return(
            <Screen>
                <Header />
                <ScrollView>
                    <View style={styles.header}>
                        <View style={{marginTop: -35,flexDirection: 'row',alignItems: 'center',justifyContent:'center'}}>
                            <Image source={require('../images/guy.png')} style={styles.avatar}/>
                            <View>
                                <Title style={{fontSize:17,color:'#fff'}}>{this.state.name}</Title>
                                <Subtitle style={{fontSize:14,color:'#fff'}}>PUBG Username : {this.state.gamertag}</Subtitle>
                                <Title style={{fontSize:17,color:'#fff'}}>Balance : ₹ {this.state.balance}</Title>
                            </View>
                        </View>
                    </View>
                    <View style={styles.subHeader}>
                        <View style={styles.subHeaderItem}>
                            <Title>0</Title>
                            <Subtitle style={{fontSize:13,color: '#10102d', fontWeight: 'bold'}}>Match Played</Subtitle>
                        </View>
                        <View style={[styles.subHeaderItem, styles.borderBoth]}>
                            <Title>₹ 0</Title>
                            <Subtitle style={{fontSize:13,color: '#10102d', fontWeight: 'bold'}}>Total Earned</Subtitle>
                        </View>
                        <View style={styles.subHeaderItem}>
                            <Title>0</Title>
                            <Subtitle style={{fontSize:13,color: '#10102d', fontWeight: 'bold'}}>Chicken Dinner</Subtitle>
                        </View>
                    </View>
                    <View style={styles.list}>
                        {KYC}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Refer')} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/add-friend.png')}/>
                            <Text style={styles.listLabel}>Refer & Earn</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AccountEdit')} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/settings.png')}/>
                            <Text style={styles.listLabel}>Upate Account</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Wallet')} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/wallet.png')}/>
                            <Text style={styles.listLabel}>My wallet</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('About')} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/icon.png')}/>
                            <Text style={styles.listLabel}>About Us</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/GameSetter-111812706850918')} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/facebook.png')}/>
                            <Text style={styles.listLabel}>Facebook</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://youtube.com/')} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/youtube.png')}/>
                            <Text style={styles.listLabel}>Youtube Channel</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/gamesetter01')} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/instagram.png')}/>
                            <Text style={styles.listLabel}>Instagram</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://youtube.com/')} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/question.png')}/>
                            <Text style={styles.listLabel}>How to Join Game ?</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Policy')} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/policy.png')}/>
                            <Text style={styles.listLabel}>Terms & Conditions</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Support')} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/customer-service.png')}/>
                            <Text style={styles.listLabel}>Customer Support</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._share()} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/share.png')}/>
                            <Text style={styles.listLabel}>Share App</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._logout()} style={styles.listItem}>
                            <Image style={styles.listIcon} source={require('../images/logout.png')}/>
                            <Text style={styles.listLabel}>Logout</Text>
                            <Icon style={styles.listIndc} name='chevron-right' size={20} color='#616161' />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.modalParent}>
                    <Modal style={styles.con} onBackdropPress={() => this.setState({ modal: false })} isVisible={this.state.modal} useNativeDriver={true}>
                        <View style={styles.modal}>
                            <TouchableOpacity style={styles.close} onPress={() => this.setState({ modal: false })}>
                                <Icon name='x-circle' color='#212121' size={25} />
                            </TouchableOpacity>
                            <Title style={{margin:0,padding:0,marginBottom:10}}>Please complete KYC</Title>
                            
                        </View>
                    </Modal>
                </View>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#10102d',
        height: 180,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 15
    },
    subHeader: {
        marginHorizontal:15,
        marginTop: -40,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical:10,
        elevation: 2,
        marginBottom:10
    },
    subHeaderItem: {
        flexGrow: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    borderBoth: {
        borderLeftColor: '#212121',
        borderLeftWidth: 1.5,
        borderRightColor: '#212121',
        borderRightWidth: 1.5
    },
    avatar: {
        marginRight:5,
        height:100,
        width:100,
        resizeMode: "contain",
    },
    list: {
        paddingTop: 0,
        paddingBottom: 10
    },
    listItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        elevation: 2,
        marginHorizontal: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 5,
        marginTop:10
    },
    listIcon: {
        resizeMode: 'contain',
        height: 35,
        width: 35
    },
    listLabel: {
        color: '#212121',
        fontWeight: 'bold',
        marginLeft:20
    },
    listIndc: {
        position: 'absolute',
        right: 15
    },
    modalParent: {
        flex: 1,
    },
    con: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '85%',
        height: 120,
        padding: 15,
    },
    modalContent: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    roomText: {
        color: '#212121',
        marginLeft: 10
    },
    close: {
       position: 'absolute',
       margin: 10,
       zIndex: 99,
       right: 0,
    }
});