import React, {PureComponent} from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

class TextButton extends PureComponent {
  render() {
    const { children, onPress, style = {} } = this.props
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={style}>{children}</Text>
      </TouchableOpacity>
    )
  }
}

export default TextButton
