import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';

const AppNavContainer = () => {

    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    )
}

// screens => Home => Drawer
// screens => Auth => More stuff

export default AppNavContainer;