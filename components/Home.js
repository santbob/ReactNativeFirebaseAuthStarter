import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {AppLoading} from 'expo'

import {white} from '../utils/colors'

class Home extends Component {

  state = {
    ready: true
  }

  componentDidMount() {

  }

  render() {
    if (!this.state.ready) {
      return (<AppLoading/>)
    }
    return (
      <View><Text>Home</Text></View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
});

function mapDispatchToProps(dispatch) {
  return {
  }
}

function mapStateToProps(state) {
  return state
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
