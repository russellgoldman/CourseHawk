import React, { Component } from 'react';
import { Text, View } from "react-native";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from "expo";

class BannerContainer extends Component {

  bannerError() {
    console.log("An error");
    return;
  }

  render() {
    return (
      <View>
        <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3331858563196932/4048544547"
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />
      </View>
    );
  }
}

const styles = {
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
};

export default BannerContainer;
