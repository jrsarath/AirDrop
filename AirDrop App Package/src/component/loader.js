import React, { Component } from 'react';
import {View,Image,Text} from 'react-native';

export default class Loading extends Component {
    render(){
        return(
            <View style={{flex:1, width: '100%',backgroundColor: '#fff', alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
                <Image source={require('../images/running.gif')} style={{width:'50%',height: '50%',resizeMode: 'contain'}} />
                <Text style={{fontSize:18}}>Loading the Arena..</Text>
            </View>
        );
    }
}