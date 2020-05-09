import React, { Component } from 'react';
import {createSwitchNavigator, createStackNavigator,createAppContainer} from 'react-navigation';
// COMPONENTS
import { StatusBar, Text, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Linking, Alert, Clipboard } from 'react-native';
import { Row, Title,  Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';

export default class matchDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            button: 'Join Now',
            action: this.props.navigation.state.params.data.livelink == null ? () => ToastAndroid.show("This match isn't live yet", ToastAndroid.SHORT) : () => Linking.openURL(this.props.navigation.state.params.data.livelink)
        }        
    }
    showRoomDetails(data) {
        Alert.alert('Prepare for battle', 'Room Id:  '+data.roomid+'\nPassword:  '+data.roomid);
    }
    render(){
        const { navigation } = this.props;
        const data = navigation.getParam("data");
        const time = data.matchschedule.split(' ')[1]+" "+data.matchschedule.split(' ')[2];
        const date = data.matchschedule.split(' ')[0].split('/')[1]+"/"+data.matchschedule.split(' ')[0].split('/')[0]+"/"+data.matchschedule.split(' ')[0].split('/')[2];
        return(
            <Screen style={{backgroundColor: '#fff'}}>
                <ScrollView>
                    <Image source={{uri: data.banner, isStatic: true}} style={styles.imgBg} />
                    <View style={styles.container}>
                        <View>
                            <Title style={{fontWeight:'bold'}}>Match #{data.id}</Title>
                            <Subtitle>Date: {data.matchschedule}</Subtitle>
                        </View>
                        <Title style={styles.subText}>Match Details:</Title>
                        <View style={styles.items}>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Type: {data.matchtype}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Mode: {data.type}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Map: {data.map}</Text>
                            </View>
                        </View>

                        <Title style={styles.subText}>Prize Details:</Title>
                        <View style={styles.items}>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Per Kill: ₹{data.perkill} </Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Win: ₹{data.winprice}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.gridText}>Entry Fee: ₹{data.entryfee}</Text>
                            </View>
                        </View>

                        <Title style={styles.subText}>Rules:</Title>
                        <View>
                            <Text style={{marginHorizontal: 20,color: '#212121'}}>{data.rule}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.btnCon}>
                    <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('market://details?id=com.tencent.ig')}>
                        <Text style={{color: '#f44336',fontSize: 18}}>Launch PUBGM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.roomBtn]} onPress={this.state.action}>
                        <Text style={{color: '#fff',fontSize: 18}}>Watch live </Text>
                        <Icon name="youtube" size={24} color='#fff' style={{marginLeft:5}}/>
                    </TouchableOpacity>
                </View>
            </Screen>

        );
    }
}

const styles = StyleSheet.create({
    imgBg: {
        width: '100%',
        resizeMode: 'cover',
        height: 200,
    },
    container: {
        backgroundColor: '#fff',
        padding: 20,
        flex: 1
    },
    subText: {
        marginVertical: 3,
        color: '#f44336'
    },
    items: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        elevation: 2
    },
    gridText: {
        color: '#212121',
    },
    btnCon: {
        width: '100%',
        flexDirection: 'row'
    },
    button: {
        color: '#f44336',
        backgroundColor: '#fff',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        height: 50,
        width: '50%',
        flexDirection: 'row',
        borderColor: '#f44336',
        borderWidth: 1,     
    },
    roomBtn: {
        color: '#ffffff',
        backgroundColor: '#f44336',
    }
});