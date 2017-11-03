import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, Platform} from 'react-native'
import {primary, white} from '../utils/colors'

class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
        <Text style={styles.title}>TeamApp</Text>
      </View>
    )
  }
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary
  },
  logo: {
    width: 150,
    height: 200
  },
  title:{
    color: white,
    fontSize: 44,
    textAlign: 'center'
  }
})
