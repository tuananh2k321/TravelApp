/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Splash from './screen/tab_app/Splash';
import Onboarding from './screen/tab_app/Onboarding/Onboarding';
import { Component } from 'react';


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

AppRegistry.registerComponent(appName, () => App);
