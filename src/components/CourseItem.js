// to be used in CourseList.js
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

class CourseItem extends Component {
  constructor(props) {
    super();
  }

  _goToCourse() {
    console.log(`transfer to ${this.props.course}`);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.outerContainer}
        onPress={this._goToCourse()}
      >
        <Text style={styles.courseText}>{this.props.course}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  outerContainer: {
    backgroundColor: '#E4E4E4',
    padding: 5,
  },
  courseText: {
    fontSize: 16,
  },
};

export default CourseItem;
