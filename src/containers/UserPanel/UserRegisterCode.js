import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import BannerContainer from '../../common/BannerContainer';
import { Spinner } from '../../common/Spinner';
import { Actions } from 'react-native-router-flux';

class UserRegisterCode extends PureComponent {
  state = {
    token: '',
    error: '',
    loading: false,
  };

  async register() {
    this.setState({ loading: true });

    fetch('https://coursehawk.herokuapp.com/users/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hashedToken: this.props.hashedToken,
        userToken: this.state.token,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var that = this;
      setTimeout(function () {
        that.setState(
        {
          email: '',
          password: '',
          error: '',
          loading: false,
        });
      }, 1000);

      // save responseJson.email to Redux along
      // also change loggedIn flag on UserReducer to true

      Actions.userPanel();
    })
    .catch((e) => {
      var that = this;
      setTimeout(function () {
        that.setState({ loading: false, error: 'Authentication Failed.', });
      }, 1000);
    });
  }

  renderButton() {
    if (this.state.loading) {
      return (
        <View style={styles.buttonStyle}>
          <Spinner size='small' />;
        </View>
      );
    }

    // else, do what is below (as the default)
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => this.register()}>
        <Text style={{ fontSize: 18 }}>Confirm Registration</Text>
      </TouchableOpacity>
    );
  }

  renderError() {
    if (this.state.error !== '') {
      return <Text style={styles.errorTextStyle}>{this.state.error}</Text>;
    } else {
      return (null);
    }
  }

  render() {
    const {
      outerContainer,
      row,
      labelStyle,
      supplementaryLabel,
      tokenInputStyle,
      bannerContainerStyle,
    } = styles;

    return (
      <View style={{ flex: 1, backgroundColor: '#5b01c4', }}>
        <View style={outerContainer}>
          <View style={{ marginTop: '3.5%' }}/>
          <View style={row}>
            <View style={{ flex: 0.5 }}/>
            <Text style={labelStyle}>Enter token:</Text>
            <TextInput style={tokenInputStyle} autoCapitalize="none" editable maxLength={40}
              onChangeText={(token) => this.setState({ token })}
              value={this.state.text} secureTextEntry />
            <View style={{ flex: 0.75 }}/>
          </View>
          <View style={{ flex: 1, marginTop: '7%' }}>
            {this.renderError()}
            {this.renderButton()}
          </View>
        </View>
        <View style={bannerContainerStyle}>
          <BannerContainer />
        </View>
      </View>
    );
  }
}

const styles = {
  outerContainer: {
    flex: 8.7,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: '10%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: '3%',
    marginLeft: 11,
    marginRight: 11,
  },
  labelStyle: {
    color: '#000',
    flex: 5,
    fontSize: 16,
  },
  supplementaryLabel: {
    color: '#000',
    flex: 5,
    fontSize: 16,
  },
  emailInputStyle: {
    color: '#000',
    flex: 4,
    height: 35,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 7.5,
  },
  tokenInputStyle: {
    color: '#000',
    flex: 8.25,
    height: 35,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 7.5,
  },
  buttonStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: '11%',
    marginLeft: '20%',
    marginRight: '20%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
    marginBottom: '2%',
  },
};

export default UserRegisterCode;
