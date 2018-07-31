import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import BannerContainer from '../../common/BannerContainer';
import { Spinner } from '../../common/Spinner';
import { connect } from 'react-redux';
import {
  registerFirstNameChange,
  registerEmailChange,
  registerPasswordChange,
  registerSpinnerStart,
  registerSpinnerOK,
  registerSpinnerReject,
} from '../../actions';
import { Actions } from 'react-native-router-flux';

class UserRegister extends PureComponent {

  async register() {
    this.props.registerSpinnerStart();

    fetch('https://coursehawk.herokuapp.com/users/registerCode', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: this.props.userData.registerFirstName,
        email: this.props.userData.registerEmail + '@mylaurier.ca',
        password: this.props.userData.registerPassword,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      const { hashedToken } = responseJson;

      var that = this;
      setTimeout(function () {
        that.props.registerSpinnerOK({
          firstName: '',
          email: '',
          password: '',
          error: '',
          loading: false,
        });
      }, 1000);

      Actions.registerCodeContainer({ hashedToken });
    })
    .catch((e) => {
      var that = this;
      setTimeout(function () {
        that.props.registerSpinnerReject({ loading: false, error: 'Authentication Failed.', });
      }, 1000);
    });
  }

  renderButton() {
    if (this.props.userData.registerLoading) {
      return (
        <View style={styles.buttonStyle}>
          <Spinner size='small' />;
        </View>
      );
    }

    // else, do what is below (as the default)
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => this.register()}>
        <Text style={{ fontSize: 18 }}>Register</Text>
      </TouchableOpacity>
    );
  }

  renderError() {
    if (this.props.userData.registerError !== '') {
      return <Text style={styles.errorTextStyle}>{this.props.userData.registerError}</Text>;
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
      firstNameInputStyle,
      emailInputStyle,
      passwordInputStyle,
      bannerContainerStyle,
    } = styles;

    return (
      <View style={{ flex: 1, backgroundColor: '#5b01c4', }}>
        <View style={outerContainer}>
          <View style={{ marginTop: '3.5%' }}/>
          <View style={row}>
            <View style={{ flex: 0.5 }}/>
            <Text style={labelStyle}>First Name:</Text>
            <TextInput style={firstNameInputStyle} autoCapitalize="none" editable maxLength={40}
              onChangeText={(firstName) => this.props.registerFirstNameChange(firstName) }
              value={this.props.userData.registerFirstName} />
            <View style={{ flex: 0.75 }}/>
          </View>
          <View style={row}>
            <View style={{ flex: 0.5 }}/>
            <Text style={labelStyle}>School email:</Text>
            <TextInput style={emailInputStyle} autoCapitalize="none" editable maxLength={40}
              onChangeText={(email) => this.props.registerEmailChange(email) }
              value={this.props.userData.registerEmail} />
            <Text style={supplementaryLabel}> @mylaurier.ca</Text>
          </View>
          <View style={row}>
            <View style={{ flex: 0.5 }}/>
            <Text style={labelStyle}>Password:</Text>
            <TextInput style={passwordInputStyle} autoCapitalize="none" editable maxLength={40}
              onChangeText={(password) => this.props.registerPasswordChange(password) }
              value={this.props.userData.registerPassword} secureTextEntry />
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
  firstNameInputStyle: {
    color: '#000',
    flex: 8.25,
    height: 35,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 7.5,
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
    height: '19%',
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
  registerFirstNameChange,
  registerEmailChange,
  registerPasswordChange,
  registerSpinnerStart,
  registerSpinnerOK,
  registerSpinnerReject,
})(UserRegister);
