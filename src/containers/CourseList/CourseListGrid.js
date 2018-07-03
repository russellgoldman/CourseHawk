import React, { Component } from 'React';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import CourseView from '../CourseView/CourseView';
import { Actions } from 'react-native-router-flux';
import { selectDepartment } from '../../actions';

const numColumns = 2;
class CourseListGrid extends Component {
  constructor(props) {
    super();
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  _renderItem(course) {
    const { courseCodeStyle, courseNameStyle, creditTextStyle } = styles;
    const { item } = course;
    var {
      courseCode,
      courseName,
      courseOffering,
      courseCredit,
      lectureHours,
      labHours,
      courseDesc,
      reqDict,
    } = item;

    var courseCode = courseCode || '';
    var courseName = courseName || '';
    var courseOffering = courseOffering || '';
    var courseCredit = courseCredit || '';
    var lectureHours = lectureHours || '';
    var labHours = labHours || '';
    var courseDesc = courseDesc || '';
    var reqDict = reqDict || '';

    return (
      <TouchableOpacity
        onPress={() => {
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
          });
        }}
      >
        <View style={styles.item}>
          <Text style={courseCodeStyle}>{course.item.courseCode}</Text>
          <Text style={courseNameStyle}>{course.item.courseName}</Text>
          <Text style={creditTextStyle}>{course.item.courseCredit}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { coursesContainer, rowContainer } = styles;

    if (this.props.department === this.props.selectedDepartment) {
      return (
        <View style={coursesContainer}>
          <FlatList
            columnWrapperStyle={rowContainer}
            data={this.props.courseData[this.props.index]}
            renderItem={this._renderItem}
            numColumns={numColumns}
          />
        </View>
      );
    }
    return (null);
  }
};

const styles = {
  coursesContainer: {
    marginTop: '5%',
    marginBottom: '5%',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '3%',
    marginRight: '3%',
  },
  item: {
    borderWidth: 2,
    borderColor: '#5b01c4',
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 3.5,
    marginBottom: 15,
    width: Dimensions.get('window').width / 2.3,
  },
  courseCodeStyle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: '5%',
  },
  courseNameStyle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginLeft: '5%',
    marginRight: '1.5%',
    marginBottom: '1.5%',
  },
  creditTextStyle: {
    fontSize: 14,
    marginTop: 5,
  },
};

const mapStateToProps = state => {
  return {
    selectedDepartment: state.department.selectedDepartment,
  };
};

export default connect(mapStateToProps)(CourseListGrid);
