import React, { Component } from 'react';
import {createSwitchNavigator, createStackNavigator,createAppContainer} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen'

// REDUX
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/Store';
import { persistStore } from 'redux-persist'
// PAGES 
import Ongoing from './pages/ongoing';
import authLoader from './pages/Load';
import Login from './pages/login';
import Signup from './pages/signup';
import Forgot from './pages/forgot';
import Splash from './pages/splash';
import Loading from './component/loader';

// Disable yellowbox
console.disableYellowBox = true;

window.store = store;

const Stack = createStackNavigator({
    Login: { screen: Login },
    Signup: { screen: Signup },
    Forgot: { screen: Forgot }
  },{
    initialRouteName: "Login",
    headerMode: 'none'
});
const Switch = createSwitchNavigator({
    Auth: { screen: Stack },
    Load: { screen: authLoader },
    App: { screen: Ongoing }
  },{
    initialRouteName: "Load",
    headerMode: 'none'
});
export const RootView = createAppContainer(Switch);

export default class App extends Component {
  componentDidMount(){
    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading/>} persistor={persistor}>
          <RootView />
        </PersistGate>
      </Provider>
    );
  }
}
