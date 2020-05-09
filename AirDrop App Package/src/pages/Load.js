import React, { Component } from 'react';
import Loading from '../component/loader';
// REDUX
import { store } from  '../redux/Store';
import { connect } from 'react-redux';

export default class authLoader extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAuth();
    }
    _bootstrapAuth(){
        store.getState().user == null ? this.props.navigation.navigate('Login') : this.props.navigation.navigate('App');
    }
    render() {
        return(
            <Loading />
        );
    }
}