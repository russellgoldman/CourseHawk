import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import SearchList from './SearchList';
import { SearchBar } from 'react-native-elements';
import BannerContainer from '../../common/BannerContainer';
import { connect } from 'react-redux';
import { changeSearchText, clearSearchText } from '../../actions';
var jsonQuery = require('json-query');
var _ = require('lodash');

// helpers for json-query
var helpers = {
  containsExactly: function (input, arg) {
    // for findCoursesContaining
    var tempInput = input || '';
    //console.log(tempInput);
    if (typeof (tempInput) != 'object') {
      //console.log(typeof (tempInput));
      if (tempInput.indexOf(arg) === 0) {
        return true;
      }
    } else {
      return false;
    }
  },
};

class SearchView extends PureComponent {
  constructor(props) {
    super();
  }

  findCoursesContaining(searchStr, courseData) {
    var allResults = [];
    var arr = [];

    //var inputSection = element.split('').splice(0, arg.length).toString();
    //console.log(`${searchStr} internal`);
    Object.keys(courseData).forEach((department) => {
      arr = jsonQuery(`${department}[**]
        [*course_code:containsExactly(${searchStr})]`,
        { data: courseData, locals: helpers }).value;
      allResults.push(arr);
    });

    return allResults;
  }

  render() {
    const { searchView, bannerContainerStyle } = styles;
    var searchResults = [];

    if (this.props.searchData.searchText != '') {
      // only run search when searchStr isn't blank
      var allResults = this.findCoursesContaining(this.props.searchData.searchText, this.props.courseData);

      allResults = allResults.forEach((arr) => {
        if (!Array.isArray(arr) || !arr.length == 0) {
          arr.forEach((course) => {
            if (!Array.isArray(searchResults) || !searchResults.length == 0) {
              searchResults.push(course);
            } else {
              searchResults.push(course);
            }
          });
        }
      });
      searchResults = _.uniqWith(searchResults, _.isEqual);
      allResults = [];
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={searchView}>
          <View>
            <SearchBar
              round
              lightTheme
              placeholder='Enter Course Code'
              containerStyle={{ backgroundColor: '#5b01c4' }}
              inputStyle={{ backgroundColor: 'white', color: '#595959' }}
              searchIcon={{ size: 24 }}
              onChangeText={(text) => this.props.changeSearchText(text)} />
          </View>
          <View>
            <SearchList filteredData={searchResults} />
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
    courseData: state.courseData,
    searchData: state.searchData,
  };
};

export default connect(mapStateToProps, { changeSearchText, clearSearchText })(SearchView);
