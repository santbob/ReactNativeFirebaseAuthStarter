import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'

import {connect} from 'react-redux'
import { primary} from '../utils/colors'

import { emailSignUp, emailSignIn } from '../utils/db'
import { notifySignUp, notifySignIn } from '../actions'

import Input from './Input'

import {white} from '../utils/colors'

class Authenticate extends Component {

  state = {
    email: '',
    password: '',
    authenticating: false,
    user: null,
    error: '',
  }

  onSignIn() {
    const {email, password} = this.state
    const {notifySignIn} = this.props
    this.setState({
      authenticating: true,
    });
    emailSignUp({email, password}, (error, user) => {
      if(error && !user){
        this.setState({error, authenticating: false})
      } else {
        this.setState({user, authenticating: false})
        notifySignIn(user)
      }
    })
  }
  render() {

    const {user} = this.props
    if(user) {
      return (
        <View><Text>Successfully Signed In</Text></View>
      )
    }
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
        <Input
          placeholder='Enter your email...'
          label='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          placeholder='Enter your password...'
          label='Password'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity style={[styles.btn]} onPress={() => this.onSignIn()}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        <Text>{this.state.error}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200
  },
  btn: {
    backgroundColor: white,
    padding: 10,
    height: 45,
    margin: 10,
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        borderRadius: 7
      },
      android: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2
      }
    })
  },
  btnText: {
    color: primary,
    fontSize: 22,
    textAlign: 'center'
  }
});

function mapStateToProps(state) {
  const {user} = state
  return {user}
}

function mapDispatchToProps(dispatch) {
  return {
    notifySignIn: (user) => dispatch(notifySignIn(user))
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Authenticate)
