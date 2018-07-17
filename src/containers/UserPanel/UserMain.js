import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BannerContainer from '../../common/BannerContainer';

class UserMain extends PureComponent {
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
    const { userPanelView, bannerContainerStyle } = styles;

    return (
      <View style={{ flex: 1 }}>
        <View style={userPanelView}>
          {this.authenticatedRender()}
        </View>
        <View style={bannerContainerStyle}>
          <BannerContainer />
        </View>
      </View>
    );
  }
}

const styles = {
  userPanelView: {
    flex: 8.7,
  },
  bannerContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
};

export default UserMain;
