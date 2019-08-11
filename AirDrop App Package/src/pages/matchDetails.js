import React, { Component } from 'react';
import {createSwitchNavigator, createStackNavigator,createAppContainer} from 'react-navigation';
// COMPONENTS
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';

export default class matchDetails extends Component {
    constructor(){
        super();
        this.state = {
            button: 'Join Now'
        }        
    }
    joinMatch(id){
        console.log(id);
        console.log("hi")
    }
    render(){
        const { navigation } = this.props;
        const data = navigation.getParam("data");
        console.log(data);
        return(
            <Screen style={{flex: 1}}>
                <ImageBackground source={{uri: data.banner, isStatic: true}} style={styles.imgBg}>
                    <View style={styles.overlay}></View>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left" color='#fff' size={25}/>
                        </TouchableOpacity>
                        <Title styleName='bold' style={{color: '#fff'}}>Join Match #{data.id}</Title>
                    </View>
                </ImageBackground>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={() => this.joinMatch(data.id)}>
                        <Text style={{color: '#fff',fontSize: 18}}>{this.state.button}</Text>
                    </TouchableOpacity>
                </View>
            </Screen>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 55,
        backgroundColor: 'transparent',
        color:'#fff',
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        left: 20
    },
    overlay:{
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },  
    imgBg: {
        width: '100%',
        resizeMode: 'cover',
        flexGrow: 1
    },
    container: {
        width: '100%',
        height: '55%',
        backgroundColor: '#fff',
    },
    button: {
        position: 'absolute',
        bottom: 0,
        color: '#ffffff',
        backgroundColor: '#f44336',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        height: 50,
        width: '100%',
        
    }
});