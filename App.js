import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import DepartmentList from './src/containers/CourseList/DepartmentList';
import Router from './src/Router';

console.disableYellowBox = true;
const App = () => {
  return (
    <Provider store={(createStore(reducers))}>
      <Router />
    </Provider>
  );
};

export default App;
