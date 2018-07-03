import React, { Component } from 'react';
import { View } from 'react-native';

class AnimatedView extends Component {
  constructor(props) {
    super();
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    return (
      <View>
        {props.children}
      </View>
    );
  }
}

export default AnimatedView;
