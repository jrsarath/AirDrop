import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { StatusBar, StyleSheet, Image, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Dimensions, Linking, Clipboard } from 'react-native';
import { Row, Title, Text, Subtitle, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Feather';

class MatchCard extends Component {
    constructor(){
        super();
        this.state = {
            modal: false
        }
    }
    _showRoomPass(data){
        console.log(data);
        this.setState({
            modal: true
        })
    }
    render() {
        const formatteddate = this.props.data.matchschedule.split(' ')[1]+this.props.data.matchschedule.split(' ')[2]+" "+this.props.data.matchschedule.split(' ')[0];
        return (
            <View style={styles.card}>
                <Image source={{uri: this.props.data.banner}} style={styles.featured} />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={{marginRight: 20}}>
                            <Image source={require('../images/target.png')} style={styles.icon} />
                        </View>
                        <View style={{marginTop:5}}>
                            <Title>Match #{this.props.data.id}</Title>
                            <Subtitle>Time: {formatteddate}</Subtitle>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.grid}>
                            <Text style={styles.text}>WIN PRIZE</Text>
                            <Text style={styles.data}>{this.props.data.winprice}</Text>
                        </View>
                        <View style={styles.grid}>
                            <Text style={styles.text}>PER KILL</Text>
                            <Text style={styles.data}>{this.props.data.perkill}</Text>
                        </View>
                        <View style={styles.grid}>
                            <Text style={styles.text}>ENTRY FEE</Text>
                            <Text style={styles.data}>{this.props.data.entryfee}</Text>
                        </View>
                        <View style={styles.grid}>
                            <Text style={styles.text}>TYPE</Text>
                            <Text style={styles.data}>{this.props.data.matchtype}</Text>
                        </View>
                        <View style={styles.grid}>
                            <Text style={styles.text}>VERSION</Text>
                            <Text style={styles.data}>{this.props.data.type}</Text>
                        </View>
                        <View style={styles.grid}>
                            <Text style={styles.text}>MAP</Text>
                            <Text style={styles.data}>{this.props.data.map}</Text>
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btnSpectate} onPress={this.props.data.livelink == null ? () => ToastAndroid.show("This match isn't live yet", ToastAndroid.SHORT) : () => Linking.openURL(this.props.data.livelink)}>
                            <Text style={styles.textSpectate}>SPECTATE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnDetails} onPress={() => this.setState({ modal:true })}>
                            <Text style={styles.textDetails}>PLAY NOW</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.modalParent}>
                    <Modal style={styles.con} onBackdropPress={() => this.setState({ modal: false })} isVisible={this.state.modal} useNativeDriver={true}>
                        <View style={styles.modal}>
                            <TouchableOpacity style={styles.close} onPress={() => this.setState({ modal: false })}>
                                <Icon name='x-circle' color='#212121' size={25} />
                            </TouchableOpacity>
                            <Title style={{margin:0,padding:0,marginBottom:10}}>Room ID & Password:</Title>
                            <View style={styles.modalContent}>
                                <Icon name='clipboard' size={20} color='#212121' onPress={() => {Clipboard.setString(this.props.data.roomid); ToastAndroid.show('Room ID Copied!', ToastAndroid.SHORT);}} />
                                <Text selectable={true} style={styles.roomText}>Room ID : {this.props.data.roomid}</Text>
                            </View>
                            <View style={styles.modalContent}>
                                <Icon name='clipboard' size={20} color='#212121' onPress={() => {Clipboard.setString(this.props.data.roompassword); ToastAndroid.show('Room Password Copied!', ToastAndroid.SHORT);}} />
                                <Text selectable={true} style={styles.roomText}>Password : {this.props.data.roompassword}</Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}
export default withNavigation(MatchCard);
const styles = StyleSheet.create({
    card: {
        margin: 15,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowOpacity: 0.30,
        shadowRadius: 10,
    },
    icon:{
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },
    featured: {
        width: Dimensions.get('screen').width - 30,
        height: 200,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: 'row'
    },
    info: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center',
        marginTop: 20
    },
    grid: {
        width: '33.3333333%',
        marginBottom:10
    },
    text: {
        fontSize: 13,
        color: 'grey',
        textAlign: 'center',
    },
    data: {
        fontSize: 15,
        color: '#212121',
        textAlign: 'center',
        fontWeight: '700'
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 10
    },
    btnDetails: {
        flexGrow: 1,
        paddingVertical: 8,
        borderColor: '#f44336',
        borderWidth: 1,
        borderRadius: 3,
        marginLeft: 5
    },
    btnSpectate: {
        flexGrow: 1,
        backgroundColor: '#f44336',
        paddingVertical: 8,
        borderColor: '#f44336',
        borderWidth: 1,
        borderRadius: 3,
        marginRight: 5
    },
    textDetails: {
        color: '#f44336',
        textAlign: 'center'
    },
    textSpectate: {
        color: '#fff',
        textAlign: 'center'
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