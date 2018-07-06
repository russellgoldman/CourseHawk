import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import BannerContainer from '../../common/BannerContainer';
import { connect } from 'react-redux';
import { changeSearchText, clearSearchText } from '../../actions';

class SearchView extends PureComponent {
  render() {
    const { searchView, bannerContainerStyle } = styles;
    console.log(this.props.searchData.searchText);

    return (
      <View style={{ flex: 1 }}>
        <View style={searchView}>
          <View style={{ flex: 1 }}>
            <SearchBar
              round
              lightTheme
              placeholder='Enter Course Code'
              containerStyle={{ backgroundColor: '#5b01c4' }}
              inputStyle={{ backgroundColor: 'white', color: '#595959' }}
              searchIcon={{ size: 24 }}
              onChangeText={(text) => this.props.changeSearchText(text)}
              onClear={() => this.props.clearSearchText()} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ textAlign: 'center', fontSize: '22px', }}>
              {this.props.searchData.searchText}
            </Text>
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
  searchView: {
    flex: 8.7,
  },
  bannerContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
};

const mapStateToProps = state => {
  return {
    searchData: state.searchData,
  };
};

export default connect(mapStateToProps, { changeSearchText, clearSearchText })(SearchView);
