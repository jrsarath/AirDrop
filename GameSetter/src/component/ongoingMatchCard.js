import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { StatusBar, StyleSheet, Image, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Dimensions } from 'react-native';
import { Row, Title, Text, Subtitle, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';

class MatchCard extends Component {
    render() {
        return (
            <View style={styles.card}>
                <Image source={this.props.image} style={styles.featured} />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={{marginRight: 20}}>
                            <Image source={require('../images/target.png')} style={styles.icon} />
                        </View>
                        <View style={{marginTop:5}}>
                            <Title>{this.props.matchName}</Title>
                            <Subtitle>Time: {this.props.time}</Subtitle>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.grid}>
                            <Text style={styles.text}>WIN PRIZE</Text>
                            <Text style={styles.data}>{this.props.winPrize}</Text>
                        </View>
                        <View style={styles.grid}>
                            <Text style={styles.text}>PER KILL</Text>
                            <Text style={styles.data}>{this.props.perKill}</Text>
                        </View>
                        <View style={styles.grid}>
                            <Text style={styles.text}>ENTRY FEE</Text>
                            <Text style={styles.data}>{this.props.entryFee}</Text>
                        </View>
                        <View style={styles.grid}>
                            <Text style={styles.text}>TYPE</Text>
                            <Text style={styles.data}>{this.props.type}</Text>
                        </View>
                        <View style={styles.grid}>
                            <Text style={styles.text}>VERSION</Text>
                            <Text style={styles.data}>{this.props.version}</Text>
                        </View>
                        <View style={styles.grid}>
                            <Text style={styles.text}>MAP</Text>
                            <Text style={styles.data}>{this.props.map}</Text>
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btnSpectate}>
                            <Text style={styles.textSpectate}>SPECTATE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnDetails} onPress={() => this.props.navigation.navigate('MatchDetails')}>
                            <Text style={styles.textDetails}>PLAY NOW</Text>
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
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 2,
    },
    icon:{
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },
    featured: {
        width: Dimensions.get('screen').width - 20,
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
        width: '33.3333333%'
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
        fontWeight: '700',
        marginVertical: 15
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
    }
});