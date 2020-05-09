import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// FRESHCHAT 
import { Freshchat } from 'react-native-freshchat-sdk';

export default class Chat extends Component {
    render(){
        return(
            <TouchableOpacity style={styles.chat} onPress={() => Freshchat.showConversations()}>
                <Icon name='message-square' color='#fff' size={28} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  chat: {
    position: 'absolute',
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 50,
    bottom: 10,
    right: 15,
    elevation: 4
  }
});