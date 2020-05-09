import React, { Component } from 'react';
import {createSwitchNavigator, createStackNavigator,createAppContainer} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// REDUX
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/Store';
import { persistStore } from 'redux-persist'
import { AddNotification } from './redux/Actions/Actions';
// PAGES 
import MainApp from './pages/MainApp';
import authLoader from './pages/Load';
import Login from './pages/login';
import Signup from './pages/signup';
import Forgot from './pages/forgot';
import Loading from './component/loader';
import OtpScreen from './pages/Otp';
// FIREBASE
import firebase from 'react-native-firebase';

// Disable yellowbox
console.disableYellowBox = true;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f44336',
    accent: '#f1c40f',
  }
};

const Stack = createStackNavigator({
    Login: { screen: Login },
    Signup: { screen: Signup },
    Forgot: { screen: Forgot },
    OtpAlt: { screen: OtpScreen },
  },{
    initialRouteName: "Login",
    headerMode: 'none'
});
const Switch = createSwitchNavigator({
    Auth: { screen: Stack },
    Load: { screen: authLoader },
    App: { screen: MainApp }
  },{
    initialRouteName: "Load",
    headerMode: 'none'
});
export const RootView = createAppContainer(Switch);

export default class App extends Component {
  componentDidMount(){
    firebase.messaging().subscribeToTopic('matchUpdate');
    // FIREBASE
    firebase.notifications().onNotification((e) => {
      console.log(e);
      store.dispatch(AddNotification(e));
    });
    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading text='Loading the Arena'/>} persistor={persistor}>
          <RootView />
        </PersistGate>
      </Provider>
    );
  }
}