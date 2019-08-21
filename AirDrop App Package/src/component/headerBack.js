import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';

class Header extends Component {
    render(){
        return(
            <View style={styles.header}>
                <TouchableOpacity style={styles.drawer} onPress={() => this.props.navigation.goBack()}>
                    <Icon name='chevron-left' color='#fff' size={25}/>
                </TouchableOpacity>
                <Title style={{color:'#fff'}}>{this.props.text}</Title>
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
    },
    logo: {
        height: 35,
        width: 160,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    drawer: {
        paddingHorizontal: 15,
        marginRight:10
    }
});