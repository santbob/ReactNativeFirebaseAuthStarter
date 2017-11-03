import React, {Component} from 'react';
import { View, StyleSheet, Text, TextInput, Platform } from 'react-native';
import {white, lightGray} from '../utils/colors'

class Input extends Component {
  render() {
    const {label, value, onChangeText, placeholder, secureTextEntry} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{ label }</Text>
        <TextInput
          autoCorrect={false}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          value={value}
          placeholderTextColor={lightGray}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    borderColor: '#eee',
    borderBottomWidth: 2,
  },
  label: {
    padding: 5,
    paddingLeft:0,
    color: white,
    fontSize: 17,
    fontWeight: '700',
    width: '100%',
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#333',
    fontSize: 18,
    width: '100%'
  }
});

export default Input;
