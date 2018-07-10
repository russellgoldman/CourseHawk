import React, { PureComponent } from 'React';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import CourseListGrid from './CourseListGrid';
import { collapseArrow, expandArrow } from '../../../assets/images';
import { selectDepartment, spinnerVisible } from '../../actions';
import BannerContainer from '../../common/BannerContainer';

var globalDepartment = '';
const visible = false;
class DepartmentList extends PureComponent {
  constructor(props) {
    super();

    departmentArray = Object.keys(props.courseData).map((department) => {
      if (department.includes('Dept')) {
        return department.split('(')[0];
      } else if (department.includes('Program')) {
        return department.split('Program')[0].trim();
      } else if (department.includes('Option')) {
        return department.split('Option')[0].trim();
      }

      return department;
    });

    departmentArray = departmentArray.map((department) => {
      return {
        department: department,
        props,    // needed because FlatList cannot access this.props
        forceUpdate: this.forceUpdate.bind(this),
      };
    });

    courseCodes = Object.values(props.courseData).map((department) => {
      return Object.values(department).map((course) => {
        const {
          course_code, course_name, course_offering,
          course_credit, lecture_hours, lab_hours,
          course_desc, req_dict
        } = course;

        // set default value in case of undefined
        courseCode = course_code || '';
        courseName = course_name || '';
        courseOffering = course_offering || '';
        courseCredit = course_credit || '';
        lectureHours = lecture_hours || '';
        labHours = lab_hours || '';
        courseDesc = course_desc || '';
        reqDict = req_dict || '';

        return {
          courseCode,
          courseName,
          courseOffering,
          courseCredit,
          lectureHours,
          labHours,
          courseDesc,
          reqDict,
        };
      });
    });
  }

  renderDepartment(departmentData) {
    // destructuring department data
    const { index, item } = departmentData;
    const { department, props, forceUpdate } = item;
    const {
      departmentContainer,
      departmentText,
      arrow,
    } = styles;

    _renderArrow = (department) => {
      if (globalDepartment === department) {
        return <Image source={collapseArrow} style={arrow} />;
      } else {
        return <Image source={expandArrow} style={arrow} />;
      }
    };

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          props.selectDepartment(department);

          if (globalDepartment === department) {
            globalDepartment = '';
          } else {
            globalDepartment = department;
          }

          forceUpdate();
        }}
      >
        <View>
          <View style={departmentContainer}>
            <Text style={departmentText}>{department}</Text>
            {_renderArrow(department)}
          </View>
          <CourseListGrid courseData={courseCodes} index={index}
            department={department}/>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { flatListContainer, bannerContainerStyle } = styles;

    return (
      <View style={{ flex: 1 }}>
        <View style={flatListContainer}>
          <FlatList
            removeClippedSubviews={true}
            updateCellsBatchingPeriod={100}
            initialNumToRender={15}
            style={{ marginTop: '7.5%' }}
            data={departmentArray}
            renderItem={this.renderDepartment}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
        <View style={bannerContainerStyle}>
          <BannerContainer />
        </View>
      </View>
    );
  }
};

const styles = {
  flatListContainer: {
    flex: 8.7,
    marginTop: '-7.5%',
    paddingBottom: '1%',
  },
  bannerContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  departmentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#5b01c4',
    marginBottom: '0%',
    borderBottomWidth: 3,
    borderBottomColor: '#cecdcc',
  },
  departmentText: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: '4.5%',
    paddingBottom: '4.5%',
    color: '#fff',
    paddingLeft: '3%',
    flexWrap: 'wrap',
  },
  arrow: {
    height: 20,
    width: 20,
    marginRight: '2%',
  },
};

const mapStateToProps = state => {
  return {
    courseData: state.courseData,
    selectedDepartment: state.department.selectDepartment,
  };
};

export default connect(mapStateToProps, { selectDepartment })(DepartmentList);
