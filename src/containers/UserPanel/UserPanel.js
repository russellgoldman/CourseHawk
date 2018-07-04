import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import BannerContainer from '../../common/BannerContainer';

class UserPanel extends PureComponent {
  render() {
    const { userPanelView, bannerContainerStyle } = styles;

    return (
      <View style={{ flex: 1 }}>
        <View style={userPanelView}>
          <Text style={{ flex: 1 }}>User Settings</Text>
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

export default UserPanel;
