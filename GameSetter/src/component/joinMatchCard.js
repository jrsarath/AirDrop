import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
// COMPONENTS
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
                        <TouchableOpacity style={styles.btnJoin} onPress={() => this.props.navigation.navigate('joinMatch')} >
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