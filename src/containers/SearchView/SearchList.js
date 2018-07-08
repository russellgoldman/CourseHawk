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
    courseCode = course_code || '';
    courseName = course_name || '';
    courseOffering = course_offering || '';
    courseCredit = course_credit || '';
    lectureHours = lecture_hours || '';
    labHours = lab_hours || '';
    courseDesc = course_desc || '';
    reqDict = req_dict || '';

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          // show Course screen
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
          style={{ marginTop: '7.5%' }}
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
