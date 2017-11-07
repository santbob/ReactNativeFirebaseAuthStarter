import React from 'react';
import {StyleSheet, Text, View, StatusBar, Platform} from 'react-native';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import * as reducers from './reducers'

import {Constants} from 'expo'

import {MainNavigator} from './routes'
import Splash from './components/Splash'
import Authenticate from './components/Authenticate'

import {primaryDark} from './utils/colors'
import {firebaseApp} from './utils/db'

const store = createStore(combineReducers({
    ...reducers
}))

function AppStatusBar({
  backgroundColor,
  ...props
}) {
  return (<View style={{
      backgroundColor,
      height: Constants.statusBarHeight
    }}>
    <StatusBar translucent={false} backgroundColor={backgroundColor} {...props}/>
  </View>)
}

export default class App extends React.Component {
  state = {
    sessionChecked: false,
    user: null
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({sessionChecked: true, user})
    })
  }

  component

  renderViewBasedOnSessionCheck = () => {
    const {sessionChecked, user} = this.state
    if (sessionChecked) {
      if (user) {
        return (<View style={{
            flex: 1
          }}>
          <AppStatusBar backgroundColor={primaryDark} barStyle='light-content'/>
          <MainNavigator/>
        </View>)
      } else {
        return (<Authenticate show='signin' type="email"/>)
      }
    } else {
      return (<Splash/>)
    }
  }

  render() {
    return (
      <Provider store={store}>
        {this.renderViewBasedOnSessionCheck()}
      </Provider>
    );
  }
}
