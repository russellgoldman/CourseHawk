import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class UserMain extends Component {
  state = {
    auth: false,
  };

  authenticatedRender() {
    if (this.state.auth === true) {
      return (
        <View>
          <Text>You are logged in</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>You are not logged in</Text>
        <Text style={{ color: 'blue' }} onPress={() => Actions.userLoginRegister() }>Go to Login / Register page</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.authenticatedRender()}
      </View>
    );
  }
}

export default UserMain;
