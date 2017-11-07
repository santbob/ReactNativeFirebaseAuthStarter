import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'

import TextButton from './TextButton'
import {connect} from 'react-redux'
import {primary} from '../utils/colors'

import {emailSignUp, emailSignIn} from '../utils/db'
import {notifySignIn, notifySignOut} from '../actions'

import Input from './Input'

import {white} from '../utils/colors'

class Authenticate extends Component {

  state = {
    email: '',
    password: '',
    authenticating: false,
    user: null,
    error: '',
    showing: 'signin'
  }

  componentDidMount() {
    const {showing} = this.props
    this.setState({
      showing: showing || 'signin'
    })
  }

  onSubmit() {
    const {email, password, showing} = this.state
    const {notifySignIn} = this.props
    this.setState({authenticating: true});
    const authenticateFn = (showing === 'signin')
      ? emailSignIn
      : emailSignUp
    authenticateFn({
      email,
      password
    }, (error, user) => {
      if (error && !user) {
        this.setState({error: error.message, authenticating: false})
      } else {
        this.setState({user, authenticating: false})
        notifySignIn(user)
      }
    })
  }

  renderAuthenticationToggleView = () => {
    const {showing} = this.state
    if (showing === 'signin') {
      return (<View style={styles.toggleSection}>
        <Text style={styles.toggleText}>Don't have an account?</Text>
        <TextButton style={styles.toggleText} onPress={() => this.setState({showing: 'signup'})}>Sign Up</TextButton>
      </View>)
    } else {
      return (<View style={styles.toggleSection}><Text style={styles.toggleText}>Already have an account?
      </Text>
      <TextButton style={styles.toggleText} onPress={() => this.setState({showing: 'signin'})}>Sign In</TextButton></View>)
    }
  }

  render() {

    const {user} = this.props
    const {showing} = this.state
    if (user) {
      return (<View>
        <Text>Successfully Signed In</Text>
      </View>)
    }
    return (<View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')}/>
      <Input placeholder='Enter your email...' label='Email' onChangeText={email => this.setState({email})} value={this.state.email}/>
      <Input placeholder='Enter your password...' label='Password' secureTextEntry={true  } onChangeText={password => this.setState({password})} value={this.state.password}/>
      <TouchableOpacity style={[styles.btn]} onPress={() => this.onSubmit()}>
        <Text style={styles.btnText}>{
            showing === 'signin'
              ? 'Sign In'
              : 'Sign Up'
          }</Text>
      </TouchableOpacity>
      <Text>{this.state.error}</Text>
      {this.renderAuthenticationToggleView()}
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  toggleSection:{
    flex:1,
    flexDirection: 'row'
  },
  toggleText: {
    color: white,
    fontSize: 18,
    marginRight: 5
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
