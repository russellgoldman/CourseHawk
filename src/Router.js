import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import DepartmentList from './containers/CourseList/DepartmentList';
import CourseView from './containers/CourseView/CourseView';
import SearchView from './containers/SearchView/SearchView';
import UserPanel from './containers/UserPanel/UserPanel';
import Filter from './containers/SearchView/Filter';
import { search, user, close, filter, back } from '../assets/images';

/* Notes:
  - <Scene></Scene> wraps are used to indicate breaks of flows (no back button)
  - The hideNavBar prop hides the navigation bar for all immediate children of a Scene,
    doesn't affect grandchild Scene components
*/
const RouterComponent = () => {
  return (
    <Router sceneStyle={{ backgroundColor: '#fff' }}>
      <Scene key="root" hideNavBar initial>
        <Scene key="modal" intial>
          <Scene
            key="coursesList"
            component={DepartmentList}
            title="Courses by Department"
            navigationBarStyle={{ backgroundColor: '#fff' }}
            leftButtonImage={user}
            leftButtonIconStyle={{ height: 22.5, width: 22.5, marginLeft: 5, marginRight: 5 }}
            rightButtonImage={search}
            rightButtonIconStyle={{ height: 22.5, width: 22.5, marginLeft: 5, marginRight: 5 }}
            onLeft={ () => Actions.userPanel({ title: 'User Settings' }) }
            onRight={ () => Actions.search({ title: 'Search / Filter Courses' }) }
            initial
          />
          <Scene key="userPanel"
            component={UserPanel}
            leftButtonImage={close}
            leftButtonIconStyle={{ height: 18, width: 18, marginLeft: 5, marginRight: 5 }}
            onLeft={ () => Actions.pop() }
          />
          <Scene
            key="courseView"
            component={CourseView}
            title="Course Name"
            leftButtonImage={back}
            leftButtonIconStyle={{ height: 20, width: 20, marginLeft: 5, marginRight: 5 }}
            onLeft={ () => Actions.pop() }
            sceneStyle={{ backgroundColor: '#34026F' }}
          />
        </Scene>
        <Scene key="search" modal={true}>
          <Scene key="searchView"
            component={SearchView}
            leftButtonImage={close}
            leftButtonIconStyle={{ height: 18, width: 18, marginLeft: 5, marginRight: 5 }}
            rightButtonImage={filter}
            rightButtonIconStyle={{ height: 21, width: 21, marginLeft: 5, marginRight: 5 }}
            onLeft={ () => Actions.pop() }
            onRight={ () => Actions.filter({ title: 'Filter Options' }) }
            initial
          />
          <Scene key="filter"
            component={Filter}
            leftButtonImage={back}
            leftButtonIconStyle={{ height: 20, width: 20, marginLeft: 5, marginRight: 5 }}
            onLeft={ () => Actions.pop() }
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
