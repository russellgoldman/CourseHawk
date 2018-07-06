import { combineReducers } from 'redux';
import CourseDataReducer from './CourseDataReducer';
import DepartmentReducer from './DepartmentReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
  courseData: CourseDataReducer,
  department: DepartmentReducer,
  searchData: SearchReducer,
});
