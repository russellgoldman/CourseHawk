import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
var jsonQuery = require('json-query');
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import BannerContainer from '../../common/BannerContainer';
import { findCourseJSON, isCourse } from '../../utilities/JSONUtilities';

class CourseView extends Component {
  constructor(props) {
    super();
  }

  _renderKeyValue(key, value) {
    const { keyStyle, valueContainer, valueStyle } = styles;

    if (value != '') {
      return (
        <View>
          <Text style={keyStyle}>{key}:</Text>
          <View style={valueContainer}>
            <Text style={valueStyle}>{value}</Text>
          </View>
        </View>
      );
    }

    return (null);
  }

  _renderValueWithLinks(courseDataArr, value) {
    var linkKeys = [];
    courseDataArr.forEach((courseData) => {
      linkKeys.push(Object.keys(courseData)[0]);
    });

    linkKeyIndex = 0;
    words = value.split(/[\s, ]+/);

    var prevWordWasCourse = false;   // whether to add a '/' or not
    var separator = '';
    var space = '';
    var isFirstWord = true;

    return words.map((word) => {
      if (prevWordWasCourse) {
        separator = ',';
      } else {
        separator = '';
      }

      if (isCourse(word)) {
        prevWordWasCourse = true;
        space = ' ';
      } else {
        prevWordWasCourse = false;
      }

      if (!isFirstWord) {
        space = ' ';
      } else {
        space = '';
      }

      isFirstWord = false;

      if (linkKeys.includes(word) && Object.values(courseDataArr[linkKeyIndex])[0] !== null) {
        courseObj = Object.values(courseDataArr[linkKeyIndex])[0];

        linkKeyIndex++;

        var courseCode = courseObj.course_code || '';
        var courseName = courseObj.course_name || '';
        var courseOffering = courseObj.course_offering || '';
        var courseCredit = courseObj.course_credit || '';
        var lectureHours = courseObj.lecture_hours || '';
        var labHours = courseObj.lab_hours || '';
        var courseDesc = courseObj.course_desc || '';
        var reqDict = courseObj.req_dict || '';

        return (
          <View style={{ flexDirection: 'row' }} key={Math.random() * Math.random()}>
            <Text style={styles.valueReqStyle} key={Math.random() * Math.random()}>{separator}</Text>
            <Text style={styles.valueLinkStyle} key={Math.random() * Math.random()} onPress={() => {
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
            }}>{space}{word}</Text>

          </View>
        );
      } else {
        prevWordWasLink = false;
        return (
          <Text style={styles.valueReqStyle} key={Math.random() * Math.random()}> {word}</Text>
        );
      }
    });
  }

  _renderRequirements(reqDict) {
    const { keyStyle, valueReqContainer, valueStyle } = styles;

    if (reqDict != '') {
      keys = Object.keys(reqDict);
      values = Object.values(reqDict);
      reqArr = [];

      for (i = 0; i < keys.length; i++) {
        reqArr.push({ [keys[i]]: values[i] });
      };

      return reqArr.map((req) => {
        if (Object.keys(req)[0] != 'Notes') {
          courseDataArr = this._createReqCourseLinks(Object.values(req)[0]);
          return (
            <View key={Math.random() * Math.random()}>
              <Text style={keyStyle}>{Object.keys(req)[0]}:</Text>
              <View style={valueReqContainer}>
                {this._renderValueWithLinks(courseDataArr, Object.values(req)[0])}
              </View>
            </View>
          );
        }
      });
    }
  }

  _createReqCourseLinks(value) {
    courseDataArr = [];   // [{ courseCode: courseDataObj }, etc...]
    words = value.split(/[\s, ]+/);   // split the words in value by all non letters and digits
    words.forEach((word) => {
      var isCourseAnswer = isCourse(word);
      if (isCourseAnswer) {
        arr = findCourseJSON(word, this.props.courseData);
        if (!Array.isArray(arr) || !arr.length == 0) {
          courseDataArr.push({ [arr[0].course_code]: arr[0] });
        }
      }
    });

    return courseDataArr;
  }

  render() {
    const {
      courseCode,
      courseName,
      courseOffering,
      courseCredit,
      lectureHours,
      labHours,
      courseDesc,
      reqDict,
    } = this.props;
    const { informationContainer, bannerContainerStyle } = styles;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={informationContainer} key={Math.random() * Math.random()}>
          <View style={{ marginTop: '2.5%' }}></View>
          {this._renderKeyValue('Course Name', courseName)}
          {this._renderKeyValue('Course Offering', courseOffering)}
          {this._renderKeyValue('Course Credit', courseCredit)}
          {this._renderKeyValue('Lecture Hours', lectureHours)}
          {this._renderKeyValue('Lab Hours', labHours)}
          {this._renderKeyValue('Course Description', courseDesc)}
          {this._renderRequirements(reqDict)}
          <View style={{ marginBottom: '25%' }}></View>
        </ScrollView>
        <View style={bannerContainerStyle}>
          <BannerContainer />
        </View>
      </View>
    );
  }
}

const styles = {
  informationContainer: {
    height: '100%',
    backgroundColor: '#5b01c4',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
  },
  bannerContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyStyle: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: '5%',
    lineHeight: 25,
    borderColor: '#fff',
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '3%',
    paddingBottom: '3%',
    marginTop: '3%',
    marginBottom: '3%',
  },
  valueReqContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '3%',
    paddingBottom: '3%',
    marginTop: '3%',
    marginBottom: '3%',
  },
  valueStyle: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#000',
    fontSize: 16,
    lineHeight: 25,
  },
  valueReqStyle: {
    flexWrap: 'wrap',
    color: '#000',
    fontSize: 16,
    lineHeight: 25,
  },
  valueLinkStyle: {
    flexWrap: 'wrap',
    color: '#007AFA',
    fontSize: 16,
    lineHeight: 25,
  },
};

const mapStateToProps = state => ({ courseData: state.courseData });

export default connect(mapStateToProps, null)(CourseView);
