import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import { Asset, AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import DepartmentList from './src/containers/CourseList/DepartmentList';
import Router from './src/Router';

console.disableYellowBox = true;

class App extends Component {
  state = {
    isSplashReady: false,
    isAppReady: false,
  };

  render () {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={(createStore(reducers))}>
        <Router />
      </Provider>
    );
  }

  _cacheResourcesAsync = async () => {
    const images = [
      require('./assets/images/back.png'),
      require('./assets/images/checkMark.png'),
      require('./assets/images/close.png'),
      require('./assets/images/collapseArrow.png'),
      require('./assets/images/expandArrow.png'),
      require('./assets/images/filter.png'),
      require('./assets/images/home.png'),
      require('./assets/images/info.png'),
      require('./assets/images/search.png'),
      require('./assets/images/user.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };
};

export default App;
