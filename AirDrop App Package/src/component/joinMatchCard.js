import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
// COMPONENTS
import { StatusBar, StyleSheet, Image, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Dimensions } from 'react-native';
import { Row, Title, Text, Subtitle, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// REDUX 
import { store } from '../redux/Store';

class MatchCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            action: () => +store.getState().wallet >= +this.props.data.entryfee ? this.props.navigation.navigate('joinMatch', {data: this.props.data}) : this.props.navigation.navigate('Wallet')
        }
    }
    componentDidMount() {
        store.subscribe(()=> {
            this.setState({
                action: () => +store.getState().wallet >= +this.props.data.entryfee ? this.props.navigation.navigate('joinMatch', {
                    data: this.props.data
                }) : this.props.navigation.navigate('Wallet')
            })
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
                            <Image source={require('../images/icon.png')} style={styles.icon} />
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
                        <TouchableOpacity style={styles.btnJoin} onPress={this.state.action} >
                            <Text style={styles.textJoin}>JOIN</Text>
                        </TouchableOpacity>                        
                    </View>
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
    header: {
        flexDirection: 'row',
        padding: 20,
    },
    info: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10
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
        flexDirection: 'row'
    },
    btnJoin: {
        backgroundColor: '#f44336',
        flexGrow: 1,
        paddingVertical: 15
    },
    textJoin: {
        color: '#fff',
        textAlign: 'center'
    }
});