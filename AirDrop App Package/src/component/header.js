import React, { Component } from 'react';
import { StatusBar, StyleSheet, Image, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
// REDUX
import { store } from '../redux/Store';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            wallet: store.getState().wallet,
            bonus: store.getState().bonus,
            new: store.getState().new
        }
    }
    componentDidMount(){
        store.subscribe(() => {
            this.setState({
                wallet: store.getState().wallet,
                bonus: store.getState().bonus,
                new: store.getState().new
            })
        });
    }
    render(){
        return(
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../images/logo-white.png')} />
                <TouchableOpacity style={styles.wallet} onPress={() => this.props.navigation.navigate('Wallet')}>
                    <Text style={{color:'#fff'}}>₹{this.state.wallet} / ₹{this.state.bonus}</Text>
                </TouchableOpacity>
                {this.state.new == 0 ? 
                <TouchableOpacity style={styles.noti} onPress={() => this.props.navigation.navigate('Notifications')}>
                    <Icon name='bell' color='#fff' size={25} />
                </TouchableOpacity> :
                <TouchableOpacity style={styles.noti} onPress={() => this.props.navigation.navigate('Notifications')}>
                    <Icon name='bell' color='#fff' size={25} />
                    <Text style={styles.badge}>{this.state.new}</Text>
                </TouchableOpacity>
                }
            </View>
        );
    }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
    header: {
        height: 55,
        width: '100%',
        backgroundColor: '#10102d',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: 25,
        width: 114,
        resizeMode: 'contain',
        alignSelf: 'center',
        position: 'absolute',
        left:15
    },
    drawer: {
        position: 'absolute',
        paddingHorizontal: 15,
        left:0,
    },
    wallet: {
        marginLeft: 'auto',
        marginRight: 15,
        backgroundColor: '#424242',
        padding: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    noti:{
        paddingRight: 15
    },
    badge: {
        position: 'absolute',
        color: '#fff',
        backgroundColor: '#f44336',
        width: 20,
        height:20,
        borderRadius: 50,
        textAlign: 'center',
        right:10,
        top:-8
    }
});