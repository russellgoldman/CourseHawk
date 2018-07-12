import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import SearchList from './SearchList';
import { SearchBar } from 'react-native-elements';
import BannerContainer from '../../common/BannerContainer';
import { connect } from 'react-redux';
import { changeSearchText, clearSearchText, updateResults } from '../../actions';
var jsonQuery = require('json-query');
var _ = require('lodash');

// helpers for json-query
var helpers = {
  containsExactly: function (input, arg) {
    // for findCoursesContaining
    var tempInput = input || '';
    if (typeof (tempInput) != 'object') {
      if (tempInput.indexOf(arg) === 0) {
        return true;
      }
    } else {
      // error handling
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

    Object.keys(courseData).forEach((department) => {
      arr = jsonQuery(`${department}[**]
        [*course_code:containsExactly(${searchStr})]`,
        { data: courseData, locals: helpers }).value;
      allResults.push(arr);
    });

    return allResults;
  }

  renderResults(searchResults) {
    if (Array.isArray(searchResults) && searchResults.length == 0 && this.props.searchData.searchText !== '') {
      // array is empty and an array
      return (
        <View style={{ paddingTop: 50, marginLeft: '5%', marginRight: '5%', }}>
          <Text style={{ textAlign: 'center', fontSize: 18, lineHeight: 30 }}>No courses could be found. Try changing your search and / or advanced filter preferences.</Text>
        </View>
      );
    } else if (this.props.searchData.searchText == '') {
      return (
        <View style={{ paddingTop: 50, marginLeft: '5%', marginRight: '5%', }}>
          <Text style={{ textAlign: 'center', fontSize: 18, lineHeight: 30 }}>
            To get started, enter a course code and / or access the advanced filters menu in the toolbar.
          </Text>
        </View>
      );
    }

    return <SearchList filteredData={searchResults} />;
  }

  courseQuery(searchResults, searchText) {
    if (searchText !== '') {
      // only run search when searchStr isn't blank
      var allResults = this.findCoursesContaining(searchText, this.props.courseData);

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

    return searchResults;
  }

  render() {
    const { searchView, bannerContainerStyle } = styles;
    var placeholder = 'Enter Course Code';

    if (this.props.searchData.searchText !== '') {
      placeholder = this.props.searchData.searchText;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={searchView}>
          <View>
            <SearchBar
              round
              lightTheme
              placeholder={`${placeholder}`}
              containerStyle={{ backgroundColor: '#5b01c4' }}
              inputStyle={{ backgroundColor: 'white', color: '#595959' }}
              searchIcon={{ size: 24 }}
              onChangeText={(text) => {
                // calculates the nextResults to be rendered
                var nextResults = [];
                nextResults = this.courseQuery(nextResults, text.toUpperCase());
                this.props.updateResults(nextResults);
                this.props.changeSearchText(text);
              }
            } />
          </View>
          <View>
            {this.renderResults(this.props.searchData.results)}
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

export default connect(mapStateToProps, {
  changeSearchText,
  clearSearchText,
  updateResults,
})(SearchView);
