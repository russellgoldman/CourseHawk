import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

class Info extends Component {
  constructor() {
    super();
    this.state = {
      suggestionText: `Have suggestions for CourseHawk? We're always looking for ways ` +
      `to make the app better! Please send us an email at `,
      email: 'suggestions.coursehawk@gmail.com',
    };
  }

  render() {
    const { outerContainer, innerContainer, suggestionTextStyle, emailTextStyle } = styles;

    return (
      <View style={outerContainer}>
        <View style={innerContainer}>
          <Text style={suggestionTextStyle}>{`Have suggestions for CourseHawk? We're always ` +
          `looking for ways to make the app better! Please send us an email at...`}
          </Text>
          <TouchableOpacity onPress={ () => Linking.openURL('mailto:suggestions.coursehawk@gmail.com') }>
            <Text style={emailTextStyle}>{`suggestions.coursehawk@gmail.com`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  outerContainer: {
    backgroundColor: '#5b01c4',
    flex: 1,
  },
  innerContainer: {
    marginLeft: '5%',
    marginRight: '5%',
    justifyContent: 'center',
  },
  suggestionTextStyle: {
    marginTop: '30%',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  emailTextStyle: {
    marginTop: '5%',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
};

export default Info;
