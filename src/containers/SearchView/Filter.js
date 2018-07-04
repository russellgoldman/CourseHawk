import React, { Component } from 'react';
import { View, Text, SearchBar } from 'react-native';
import BannerContainer from '../../common/BannerContainer';

class SearchView extends Component {
  render() {
    const { filterView, bannerContainerStyle } = styles;

    return (
      <View style={{ flex: 1 }}>
        <View style={filterView}>
          <Text style={{ flex: 1 }}>Apply Filters</Text>
        </View>
        <View style={bannerContainerStyle}>
          <BannerContainer />
        </View>
      </View>
    );
  }
}

const styles = {
  filterView: {
    flex: 8.7,
  },
  bannerContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
};

export default SearchView;
