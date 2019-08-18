import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENET 
import Header from '../component/headerBack';
// REDUX
import config from '../config/config.js'
import { store } from '../redux/Store';

export default class ContactScreen extends Component {
    constructor(){
        super();
        this.state = {
            email: store.getState().user,
            subject: null,
            body: null,
            button: 'Submit'
        }
    }
    render() {
        return (
            <Screen style={{backgroundColor: '#fff'}}>
                <Header text='Contact Us' />
                <ScrollView>
                    <View>
                        <Title style={styles.title}>
                            Send us a Message
                        </Title>
                        <Subtitle style={styles.subtitle}>
                            Send us a message, We will respond to it shortly and As soon as possible.
                        </Subtitle>
                        <TextInput
                            value={this.state.email}
                            style={styles.input}
                            onChangeText={(text) => this.setState({email:text})}
                            placeholder='Your Email'
                        />
                        <TextInput
                            value={this.state.subject}
                            style={styles.input}
                            onChangeText={(text) => this.setState({subject:text})}
                            placeholder='Your Subject'
                        />
                        <TextInput
                            value={this.state.body}
                            style={[styles.input, styles.textArea]}
                            onChangeText={(text) => this.setState({body:text})}
                            placeholder='Your Message'
                            numberOfLines={4}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => null}>
                            <Text style={{color: '#fff',fontSize: 18}}>{this.state.button}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{margin:20}}>
                        <Title style={{color:'#f44336',marginBottom:5}}>Support Info</Title>
                        <Subtitle style={{color:'#4a4a4a',lineHeight:20,marginBottom:20}}>If you have any questions or suggestions, do not hesitate to contact us.</Subtitle>
                        <TouchableOpacity onPress={() => Linking.openURL("tel:+916361298431")}>
                            <Subtitle style={{color:'#4a4a4a'}}>
                                Phone: +91 63612 98431
                            </Subtitle>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL("http://api.whatsapp.com/send?phone=916361298431")}>
                            <Subtitle style={{color:'#4a4a4a'}}>
                                WhatsApp: +91 63612 98431
                            </Subtitle>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL("mailto:support@gamesetter.in")}>
                            <Subtitle style={{color:'#4a4a4a'}}>
                                support@gamesetter.in
                            </Subtitle>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color:'#f44336',
        margin: 20,
        marginBottom: 0,
    },
    titleAlt: {
        color: '#f44336',
        fontSize: 17,
        marginTop: 15,
        fontWeight: 'bold'
    },
    subtitle: {
        color:'#4a4a4a',
        margin: 20,
        marginTop: 5,
        lineHeight:20,
    },
    input: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        borderRadius: 10,
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 8,
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 13,
        paddingHorizontal: 15
    },
    textArea: {
        justifyContent: "flex-start",
        textAlignVertical: 'top'
    },
    button: {
        height: 45,
        color: '#ffffff',
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44336',
        marginHorizontal: 20
    }
});