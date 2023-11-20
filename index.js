/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Splash from './screen/tab_app/Splash';
import Onboarding from './screen/tab_app/Onboarding/Onboarding';
import { Component } from 'react';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });


class Main extends Component{
    constructor(props){
        super(props);
        this.state = {currentScreen: 'Splash'};
        setTimeout(()=>{
            this.setState({currentScreen: 'Onboarding'})
        }, 3000);
    }
    render() {
        const {currentScreen} = this.state;
        let mainscreen = currentScreen === 'Splash' ? <Splash/> : <Onboarding/>
        return mainscreen;
    }
}

AppRegistry.registerComponent(appName, () => Main);
