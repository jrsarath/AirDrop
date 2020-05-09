import React, { Component } from 'react';
import { StatusBar, StyleSheet, Image, TouchableOpacity, View, ScrollView, ActivityIndicator, TextInput, ToastAndroid, Picker, Dimensions } from 'react-native';
import { Row, Title, Text, Subtitle, Caption, Button, Screen, NavigationBar } from '@shoutem/ui';
import { RNCamera } from 'react-native-camera';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Feather';
// CUSTOM COMPONENET 
import Header from '../component/headerBack';
import Chat from '../component/chatButton';
// REDUX
import config from '../config/config.js'
import { SignIn } from '../redux/Actions/Actions';
import { store } from '../redux/Store';


export default class KycScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            docFrontMod: false,
            docBack: false,
            docOneDefault: true,
            docTwoDefault: true,
            doctype: 'Aadhaar Card',
            docfront: 'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAQsAAAC9CAMAAACTb6i8AAAASFBMVEX///+ZmZmVlZWlpaXPz8/V1dWenp6Tk5O8vLz7+/vl5eWzs7Pb29ucnJysrKzh4eHu7u7Dw8P29vbKysqjo6OwsLDw8PC5ublfOHHXAAAEEklEQVR4nO3d2ZaqMBRFUQxNBLFBUf//T28ZQg6QBAQHcA/s9SalpcyBGBoxCBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgjtvdsxXLrjbe2ZdveQ4rB0Qj7Wnm1XsVxc4pPM155xu3QViU9rz7ndVS0WYtnUgpGtPetW8eeFnaNlO3/447Vn3UpZJAs/aQILEywoWFCwoGBBMbFI54uehIVFlMy3bSKSqH4aDhb5vNsm8qqfh4PFcd4tVnHUzwMLjhZyjnhaXLI5urC0OM3yPCdYmGBBwYLaj8Urj6K4dz//XiyiUn72YkoaZNvtw+JVmpG7LF++e+3C4tYaqwrf3u09WNy7w/a7+357sHhWFn9vk+pQpHi677cDi6za0DhlaZqd+o4B7cBCPUIU1Y1C3Xg777gDi89cHcL6Vng4+HaebtAibd9Ua06aK/XPhHPtuTmLWyIP1+aE+2d1YXbdVWsPuQsLNZSQTQxlIcypFOqg/S6WCz2qamKk59baUj3+7HzwtizMALOJ8VQfqbfmPdwDjE1ZNMbaDQx9FEGNKbLqj+6Tj7ZkoSmst0lSTQiLIqxYPMcjN2RRryse3SUj0xupQi82vlOPtmNRU+T2CjRqHWvznqu4GQui+FsQ+jCkd2/OViyaFA6M20VvosqLfzffRizaFA6M4PY4heHz0bfDcxsWXQoXxnCbsLApzIfHGIwtWLgoBjDS4mR/mmzAwk3Ri5Em4m8t2p3K38JH0YORqpGo6GKwt/BTeDEqChuDu0UfhQejprAwmFv0UzgxiKKLwdtiiMKBoSmEA4O1xTCFhaEp5DG4iC4GZ4tvKDoYRBHYGIwtvqNoYaTVOcOyOnDUxeBrUVMMv94aIwtaFBYGW4vvKWjHln6DFOYPl9axZq4WrxEUhNGh6GDwtHjfR1HUX+u0KNoYPC3C8zgKwhDdzdMGBk+Lw1gKgyGsDTXCYGwxisJg2FutBoOvxUiKYYwTW4vRFIMY1XuIocUEiq8wGFpMoiAM6yCiweBnMflFDmLws/CcoPlF9UerD4OfxQ/fmRjA2JXFAMa+LIKr8GGwtAjzeHr5W68m4/Z/yXla/HYhITOWcExnaDFbsGBqcZVDs/NTrK5zEMRlMl+lmXsWFgsFCwoWFCwoWFCwoFhYxOXZ09N8O/utpyTTr8zKwaJnrCVKfZ8jHSWbfAFjDhZFzxi8/kodnYUkei5r0B8Hi6hnDC701zFD0pn8JuFgkZb+i0LVC0Em6inTd4xysPhbY+SeaN1w11N+uHYxD4tlggUFCwoWFCyo/9kC141X4fcEqPV+ZyIdfnFL1zfunjH/t3rXrFjld2mK4Re2Rvi9IoQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJr9A9cjUy5bAbYVQAAAABJRU5ErkJggg==',
            docback: 'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAQsAAAC9CAMAAACTb6i8AAAASFBMVEX///+ZmZmVlZWlpaXPz8/V1dWenp6Tk5O8vLz7+/vl5eWzs7Pb29ucnJysrKzh4eHu7u7Dw8P29vbKysqjo6OwsLDw8PC5ublfOHHXAAAEEklEQVR4nO3d2ZaqMBRFUQxNBLFBUf//T28ZQg6QBAQHcA/s9SalpcyBGBoxCBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgjtvdsxXLrjbe2ZdveQ4rB0Qj7Wnm1XsVxc4pPM155xu3QViU9rz7ndVS0WYtnUgpGtPetW8eeFnaNlO3/447Vn3UpZJAs/aQILEywoWFCwoGBBMbFI54uehIVFlMy3bSKSqH4aDhb5vNsm8qqfh4PFcd4tVnHUzwMLjhZyjnhaXLI5urC0OM3yPCdYmGBBwYLaj8Urj6K4dz//XiyiUn72YkoaZNvtw+JVmpG7LF++e+3C4tYaqwrf3u09WNy7w/a7+357sHhWFn9vk+pQpHi677cDi6za0DhlaZqd+o4B7cBCPUIU1Y1C3Xg777gDi89cHcL6Vng4+HaebtAibd9Ua06aK/XPhHPtuTmLWyIP1+aE+2d1YXbdVWsPuQsLNZSQTQxlIcypFOqg/S6WCz2qamKk59baUj3+7HzwtizMALOJ8VQfqbfmPdwDjE1ZNMbaDQx9FEGNKbLqj+6Tj7ZkoSmst0lSTQiLIqxYPMcjN2RRryse3SUj0xupQi82vlOPtmNRU+T2CjRqHWvznqu4GQui+FsQ+jCkd2/OViyaFA6M20VvosqLfzffRizaFA6M4PY4heHz0bfDcxsWXQoXxnCbsLApzIfHGIwtWLgoBjDS4mR/mmzAwk3Ri5Em4m8t2p3K38JH0YORqpGo6GKwt/BTeDEqChuDu0UfhQejprAwmFv0UzgxiKKLwdtiiMKBoSmEA4O1xTCFhaEp5DG4iC4GZ4tvKDoYRBHYGIwtvqNoYaTVOcOyOnDUxeBrUVMMv94aIwtaFBYGW4vvKWjHln6DFOYPl9axZq4WrxEUhNGh6GDwtHjfR1HUX+u0KNoYPC3C8zgKwhDdzdMGBk+Lw1gKgyGsDTXCYGwxisJg2FutBoOvxUiKYYwTW4vRFIMY1XuIocUEiq8wGFpMoiAM6yCiweBnMflFDmLws/CcoPlF9UerD4OfxQ/fmRjA2JXFAMa+LIKr8GGwtAjzeHr5W68m4/Z/yXla/HYhITOWcExnaDFbsGBqcZVDs/NTrK5zEMRlMl+lmXsWFgsFCwoWFCwoWFCwoFhYxOXZ09N8O/utpyTTr8zKwaJnrCVKfZ8jHSWbfAFjDhZFzxi8/kodnYUkei5r0B8Hi6hnDC701zFD0pn8JuFgkZb+i0LVC0Em6inTd4xysPhbY+SeaN1w11N+uHYxD4tlggUFCwoWFCyo/9kC141X4fcEqPV+ZyIdfnFL1zfunjH/t3rXrFjld2mK4Re2Rvi9IoQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJr9A9cjUy5bAbYVQAAAABJRU5ErkJggg==',
            color: '#f44336',
            text: 'Submit KYC'
        }
    }
    submit_kyc() {
        this.setState({
            text: 'Please Wait..',
            color: '#bdbdbd'
        });
        if (this.state.docOneDefault == false && this.state.docTwoDefault == false) {
            fetch(config.domain + "api/user.php", {
                    method: 'POST',
                    headers: new Headers({
                        'Accept': 'application/json',
                        "Accept-Encoding": "gzip, deflate",
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        action: "kyc",
                        user: store.getState().user,
                        doctype: this.state.doctype,
                        docback: this.state.docback,
                        docfront: this.state.docfront
                    })
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 'success') {
                        ToastAndroid.show('KYC Submitted successfully', ToastAndroid.LONG);
                        store.dispatch(SignIn({
                            email: store.getState().user,
                            userData: {
                                name: store.getState().userData.name,
                                phone: store.getState().userData.phone,
                                gamertag: store.getState().userData.gamertag,
                                refercode: store.getState().userData.refercode,
                                doctype: store.getState().userData.doctype,
                                docverified: 'pending',
                            }
                        }));
                        this.props.navigation.goBack();
                        this.setState({
                            text: 'Submit KYC',
                            color: '#f44336'
                        });
                    } else {
                        ToastAndroid.show('Error sending support request', ToastAndroid.LONG);
                        this.setState({
                            text: 'Try Again',
                            color: '#f44336'
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    ToastAndroid.show('Error submitting KYC, Try again later', ToastAndroid.LONG);
                    this.setState({
                        text: 'Try Again',
                        color: '#f44336'
                    });
                });
        } else {
            ToastAndroid.show('Please capture both Front and Back side of the Document', ToastAndroid.LONG);
            this.setState({
                text: 'Try Again',
                color: '#f44336'
            });
        }
    }
    takePicture = async(mode) => {
        if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
            if (!this.state.docBack) {
                this.setState({
                    docfront: "data:image/jpg;base64,"+data.base64,
                    docFrontMod: false,
                    docOneDefault: false
                });
            } else {
                this.setState({
                    docback: "data:image/jpg;base64," + data.base64,
                    docFrontMod: false,
                    docTwoDefault: false
                });
            }
            
        }
    };
    render() {
        return (
            <Screen style={{backgroundColor: '#fff'}}>
                <Header text='Complete KYC' />
                <ScrollView>
                    <View style={[styles.input, {padding: 4,marginTop:20}]}>
                        <Picker
                            selectedValue={this.state.doctype}
                            onValueChange={(itemValue, itemIndex) => this.setState({doctype: itemValue})}
                        >
                            <Picker.Item label="Aadhaar Card" value="Aadhaar Card"/>
                            <Picker.Item label="Pan Card" value="Pan Card" />
                            <Picker.Item label="Driver License" value="Driver License" />
                            <Picker.Item label="Voter ID Card" value="Voter ID Card" />
                            <Picker.Item label="Bank Statement" value="Bank Statement" />
                        </Picker>
                    </View>

                    <View style={styles.docImgWrap}>
                        <Image source={{uri: this.state.docfront}} style={styles.docimg} />
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ docFrontMod:true,docBack:false })} style={[styles.capture, {margin:20,height:45,borderRadius:5}]}>
                        <Text style={{ fontSize:15,color: '#fff' }}> Capture Document Frontside </Text>
                    </TouchableOpacity>

                    <View style={styles.docImgWrap}>
                        <Image source={{uri: this.state.docback}} style={styles.docimg} />
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ docFrontMod:true,docBack:true })} style={[styles.capture, {margin:20,height:45,borderRadius:5}]}>
                        <Text style={{ fontSize:15,color: '#fff' }}> Capture Document Backside </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, {backgroundColor: this.state.color,marginBottom:20}]} onPress={() => {this.submit_kyc()}}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>{this.state.text}</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={styles.modalParent}>
                    <Modal style={styles.con} onBackdropPress={() => this.setState({ docFrontMod: false })} isVisible={this.state.docFrontMod} useNativeDriver={true}>
                        <View style={styles.modal}>
                            <TouchableOpacity style={styles.close} onPress={() => this.setState({ docFrontMod: false })}>
                                <Icon name='x-circle' color='#fff' size={25} />
                            </TouchableOpacity>
                            <RNCamera
                                    ref={ref => {this.camera = ref}}
                                    style={styles.preview}
                                    type={RNCamera.Constants.Type.back}
                                    flashMode={RNCamera.Constants.FlashMode.off}
                                    androidCameraPermissionOptions={{
                                        title: 'Permission to use camera',
                                        message: 'We need your permission to use your camera',
                                        buttonPositive: 'Ok',
                                        buttonNegative: 'Cancel',
                                    }}
                                    androidRecordAudioPermissionOptions={{
                                        title: 'Permission to use audio recording',
                                        message: 'We need your permission to use your audio',
                                        buttonPositive: 'Ok',
                                        buttonNegative: 'Cancel',
                                    }}
                                />
                            <TouchableOpacity onPress={() => this.docBack ? this.takePicture('back') : this.takePicture('front')} style={styles.capture}>
                                <Text style={{ fontSize:15,color: '#fff' }}>{this.state.docBack ? 'Capture Docs Backside': 'Capture Docs Frontside'}</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
                <Chat />
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
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
    button: {
        height: 45,
        color: '#ffffff',
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44336',
        marginHorizontal: 20
    },
    camContainer: {
        flex: 1,
        height: 200,
        marginHorizontal: 20,
        backgroundColor: 'black',
        //overflow: 'hidden',
        borderRadius: 5
    },
    preview: {
        width: '100%',
        height: 50,
        resizeMode: 'contain'
    },
    capture: {
        height: 55,
        color: '#ffffff',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#304ffe',
    },
    close: {
       position: 'absolute',
       margin: 10,
       zIndex: 99,
       right: 0,
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    preview: {
        flex:1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    docImgWrap: {
        elevation: 3,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        overflow: 'hidden',
        borderRadius: 5
    },
    docimg: {
        width: Dimensions.get('window').width - 40,
        height: 200,
        resizeMode: "cover",
    }
});