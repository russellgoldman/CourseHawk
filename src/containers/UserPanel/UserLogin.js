import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import BannerContainer from '../../common/BannerContainer';
import { Spinner } from '../../common/Spinner';
import { connect } from 'react-redux';
import {
  loginEmailChange,
  loginPasswordChange,
  loginSpinnerStart,
  loginSpinnerOK,
  loginSpinnerReject,
} from '../../actions';
import { Actions } from 'react-native-router-flux';

class UserLogin extends PureComponent {

  async login() {
    this.props.loginSpinnerStart();

    fetch('https://coursehawk.herokuapp.com/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.props.userData.loginEmail + '@mylaurier.ca',
        password: this.props.userData.loginPassword,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      const { hashedToken } = responseJson;

      var that = this;
      setTimeout(function () {
        that.props.loginSpinnerOK({
          email: '',
          password: '',
          error: '',
          loading: false,
        });
      }, 1000);

      Actions.userPanel();
    })
    .catch((e) => {
      var that = this;
      setTimeout(function () {
        that.props.loginSpinnerReject({ loading: false, error: 'Authentication Failed.', });
      }, 1000);
    });
  }

  renderButton() {
    if (this.props.userData.loginLoading) {
      return (
        <View style={styles.buttonStyle}>
          <Spinner size='small' />;
        </View>
      );
    }

    // else, do what is below (as the default)
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => this.login() }>
        <Text style={{ fontSize: 18 }}>Login</Text>
      </TouchableOpacity>
    );
  }

  renderError() {
    if (this.props.userData.loginError !== '') {
      return <Text style={styles.errorTextStyle}>{this.props.userData.loginError}</Text>;
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
      emailInputStyle,
      passwordInputStyle,
      buttonStyle,
      bannerContainerStyle,
    } = styles;

    return (
      <View style={{ flex: 1, backgroundColor: '#5b01c4', }}>
        <View style={outerContainer}>
          <View style={{ marginTop: '3.5%' }}/>
          <View style={row}>
            <View style={{ flex: 0.5 }}/>
            <Text style={labelStyle}>School email:</Text>
            <TextInput style={emailInputStyle} autoCapitalize="none" editable maxLength={40}
              onChangeText={(email) => this.props.loginEmailChange(email)}
              value={this.props.userData.loginEmail} />
            <Text style={supplementaryLabel}> @mylaurier.ca</Text>
          </View>
          <View style={row}>
            <View style={{ flex: 0.5 }}/>
            <Text style={labelStyle}>Password:</Text>
            <TextInput style={passwordInputStyle} autoCapitalize="none" editable maxLength={40}
              onChangeText={(password) => this.props.loginPasswordChange(password)}
              value={this.props.userData.loginPassword} secureTextEntry />
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
    maxHeight: '11.5%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: '4%',
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
  passwordInputStyle: {
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
    height: '15%',
    marginLeft: '25%',
    marginRight: '25%',
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

const mapStateToProps = state => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps,
{
  loginEmailChange,
  loginPasswordChange,
  loginSpinnerStart,
  loginSpinnerOK,
  loginSpinnerReject,
})(UserLogin);
