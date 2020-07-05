import React, {Component} from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './screen/Login';
import Home from './screen/Home';
import AuthLoading from './screen/AuthLoading';
import Chat from './screen/Chat';

const AppStack = createStackNavigator(
    { 
        Home: Home, 
        Chat:Chat 
    });
const AuthStack = createStackNavigator({ Login: Login });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);


