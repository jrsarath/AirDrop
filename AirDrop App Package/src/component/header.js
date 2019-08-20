import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';

class Header extends Component {
    render(){
        return(
            <View style={styles.header}>
                <TouchableOpacity style={styles.drawer} onPress={() => this.props.navigation.toggleDrawer()}>
                    <Icon name='menu' color='#f44336' size={25}/>
                </TouchableOpacity>
                <Image style={styles.logo} source={require('../images/logo-white.png')} />
            </View>
        );
    }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
    header: {
        height: 55,
        width: '100%',
        backgroundColor: '#fff',
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: 30,
        width: 137,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    drawer: {
        position: 'absolute',
        paddingHorizontal: 15,
        left:0,
    }
});