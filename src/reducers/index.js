import { combineReducers } from 'redux';
import CourseDataReducer from './CourseDataReducer';
import DepartmentReducer from './DepartmentReducer';

export default combineReducers({
  courseData: CourseDataReducer,
  department: DepartmentReducer,
});
