import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import BannerContainer from '../../common/BannerContainer';

class UserLogin extends PureComponent {
  state = {
    email: '',
    password: '',
  };

  async login() {
    console.log('Redux to call API to login');
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
              onChangeText={(email) => this.setState({ email })}
              value={this.state.text} />
            <Text style={supplementaryLabel}> @mylaurier.ca</Text>
          </View>
          <View style={row}>
            <View style={{ flex: 0.5 }}/>
            <Text style={labelStyle}>Password:</Text>
            <TextInput style={passwordInputStyle} autoCapitalize="none" editable maxLength={40}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.text} secureTextEntry />
            <View style={{ flex: 0.75 }}/>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={buttonStyle} onPress={() => this.login() }>
              <Text style={{ fontSize: 18 }}>Login</Text>
            </TouchableOpacity>
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
    marginTop: '7%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: '12.5%',
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
};

export default UserLogin;
