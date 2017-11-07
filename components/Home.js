import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native'
import TextButton from './TextButton'
import {connect} from 'react-redux'
import {AppLoading} from 'expo'
import { signout } from '../utils/db'
import { notifySignOut } from '../actions'


import {white, primary} from '../utils/colors'

class Home extends Component {

  state = {
    ready: true
  }

  componentDidMount() {

  }

  logout = () => {
    signout(() => {
      this.props.notifySignOut()
    })
  }

  render() {
    const {user} = this.props
    console.log("user ", user)
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
        <Text style={styles.title}>{user && user.email}</Text>
        <Text style={styles.welcomemsg}>Welcome to TeamApp</Text>
        <TextButton onPress={this.logout}>Signout</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary
  },
  logo: {
    width: 200,
    height: 200
  },
  title:{
    color: white,
    fontSize: 24,
    textAlign: 'center'
  },
  welcomemsg:{
    color: white,
    fontSize: 18,
    textAlign: 'center'
  }
});

function mapDispatchToProps(dispatch) {
  return {
    notifySignOut: () => dispatch(notifySignOut())
  }
}

function mapStateToProps(state) {
  const {user} = state
  return {user}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
