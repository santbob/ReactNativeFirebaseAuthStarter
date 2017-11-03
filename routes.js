import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation'
import {Platform} from 'react-native';

import Home from './components/Home'
import Authenticate from './components/Authenticate'
import Splash from './components/Splash'

import { Entypo } from '@expo/vector-icons'

import {primary, primaryDark, white} from './utils/colors'


export const MainNavigator = StackNavigator({
  Splash: {
    screen: Splash
  },
  Home:{
    screen: Home
  }
})
