import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Row, Title, Text, Subtitle, Image, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
// CUSTOM COMPONENET 
import Header from '../component/headerBack';

export default class AboutScreen extends Component {
    render() {
        return (
            <Screen style={{backgroundColor: '#fff'}}>
                <Header text='About Us' />
                <ScrollView>
                    <View style={{margin:20}}>
                        <Title style={{color: '#f44336',marginBottom:10}}>About Us</Title>
                        <Subtitle style={{color:'#4a4a4a',lineHeight:20}}>
                            We believe each gamer should have the ability to become better while being rewarded for their skill. That is why we are changing the esports industry and giving everybody a chance to go pro.{"\n"}
                            GameSetter is a growing group of passionate gamers, geeks, marketers, designers, streamers, engineers, and community builders, all on a mission to bridge the gap of amateurs and pros while evolving competitive gaming as we know it with innovative technology.
                            {"\n\n"}
                            GameSetter is an Online Portal which Offers Rewards and Unlimited Entertainment for Participating and Playing Games Online. Currently it supports a Popular and Trending Game i.e., PUBG Mobile.
                            {"\n\n"}
                            You might be addicted to PUBG Mobile but just think what if you can start making money or living by Playing Mobile Games? Well, this is what GameSetter Offers. Users can participate in the upcoming games and Win Amazing Prizes and Rewards.
                            {"\n\n"}
                            Currently, the platform has got support for PUBG Mobile, a Trending Game. Users can join Custom Rooms, and Get Rewards for Chicken Dinner and also for each Kill they Score.
                        </Subtitle>
                    </View>
                </ScrollView>
            </Screen>
        );
    }
}