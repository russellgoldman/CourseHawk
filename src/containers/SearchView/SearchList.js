import React, { PureComponent } from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class SearchList extends PureComponent {
  constructor(props) {
    super();
  }

  renderFilteredItems(filteredData) {
    const { item, index } = filteredData;
    const {
      course_code, course_name, course_offering,
      course_credit, lecture_hours, lab_hours,
      course_desc, req_dict
    } = item;
    console.log(item);
    console.log(index);

    // set default value in case of undefined
    var courseCode = course_code || '';
    var courseName = course_name || '';
    var courseOffering = course_offering || '';
    var courseCredit = course_credit || '';
    var lectureHours = lecture_hours || '';
    var labHours = lab_hours || '';
    var courseDesc = course_desc || '';
    var reqDict = req_dict || '';

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          // show Course screen
          console.log(courseCode);
          Actions.courseView({
            title: courseCode,
            courseCode,
            courseName,
            courseOffering,
            courseCredit,
            lectureHours,
            labHours,
            courseDesc,
            reqDict,
            onLeft: () => Actions.search(),
          });
        }}
      >
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>{item.course_code}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          style={{ marginBottom: '3.75%' }}
          data={this.props.filteredData}
          renderItem={this.renderFilteredItems}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    );
  }
}

const styles = {
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: '0%',
    borderBottomWidth: 3,
    borderBottomColor: '#cecdcc',
  },
  filterText: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: '4%',
    paddingBottom: '4%',
    color: '#000',
    paddingLeft: '3%',
    flexWrap: 'wrap',
  },
};

export default SearchList;
