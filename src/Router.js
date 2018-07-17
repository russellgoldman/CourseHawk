import React from 'react';
import { Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import DepartmentList from './containers/CourseList/DepartmentList';
import CourseView from './containers/CourseView/CourseView';
import SearchView from './containers/SearchView/SearchView';
import UserMain from './containers/UserPanel/UserMain';
import UserLogin from './containers/UserPanel/UserLogin';
import Filter from './containers/SearchView/Filter';
import {
  search,
  user,
  close,
  filter,
  back,
  home,
  checkMark,
} from '../assets/images';

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'purple' : 'black' }}>{title}</Text>
  );
};

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
            leftButtonIconStyle={{ height: 24.5, width: 24.5, marginLeft: 5, marginRight: 5 }}
            rightButtonImage={search}
            rightButtonIconStyle={{ height: 22.5, width: 22.5, marginLeft: 7, marginRight: 7 }}
            onLeft={ () => Actions.userPanel() }
            onRight={ () => Actions.search() }
            initial
          />
          <Scene
            key="courseView"
            component={CourseView}
            title="Course Name"
            leftButtonImage={back}
            leftButtonIconStyle={{ height: 20, width: 20, marginLeft: 5, marginRight: 5 }}
            rightButtonImage={home}
            rightButtonIconStyle={{ height: 21.5, width: 21.5, marginLeft: 5, marginRight: 5 }}
            onLeft={ () => Actions.pop() }
            onRight={ () => Actions.modal() }
            sceneStyle={{ backgroundColor: '#34026F' }}
          />
          <Scene
            key="courseView2"
            component={CourseView}
            title="Course Name"
            leftButtonImage={back}
            leftButtonIconStyle={{ height: 20, width: 20, marginLeft: 5, marginRight: 5 }}
            rightButtonImage={home}
            rightButtonIconStyle={{ height: 21.5, width: 21.5, marginLeft: 5, marginRight: 5 }}
            onLeft={ () => Actions.search() }
            onRight={ () => Actions.modal() }
            sceneStyle={{ backgroundColor: '#34026F' }}
          />
        </Scene>
        <Scene key="search" modal={true}>
          <Scene key="searchView"
            component={SearchView}
            title="Search Courses"
            leftButtonImage={back}
            leftButtonIconStyle={{ height: 18, width: 18, marginLeft: 5, marginRight: 5 }}
            onLeft={ () => Actions.modal() }
            initial
          />
          <Scene key="filter"
            component={Filter}
            title="Apply Filters"
            leftButtonImage={close}
            leftButtonIconStyle={{ height: 18, width: 18, marginLeft: 5, marginRight: 5 }}
            rightButtonImage={checkMark}
            rightButtonIconStyle={{ height: 22, width: 22, marginLeft: 5, marginRight: 5 }}
            onLeft={ () => Actions.pop() }
            onRight={ () => {
              Actions.pop();
            } }
          />
        </Scene>
        <Scene key="userPanel" modal={true}>
          <Scene key="userMain"
            tabs={true}
            component={UserMain}
            title="User Settings"
            leftButtonImage={back}
            leftButtonIconStyle={{ height: 18, width: 18, marginLeft: 5, marginRight: 5 }}
            onLeft={ () => Actions.modal() }
            initial
          />
          <Scene key="userLoginRegister"
            hideNavBar
            tabs={true}
            labelStyle={{ fontSize: 18, marginBottom: 7.5 }}
          >
            <Scene key="Login"
              title="Login"
              onLeft={ () => Actions.userMain() }
              leftButtonImage={back}
              leftButtonIconStyle={{ height: 18, width: 18, marginLeft: 5, marginRight: 5 }}
              initial>
              <Scene key="userLogin"
                component={UserLogin}
              />
            </Scene>
            <Scene key="Register"
              title="Register"
              onLeft={ () => Actions.userMain() }
              leftButtonImage={back}
              leftButtonIconStyle={{ height: 18, width: 18, marginLeft: 5, marginRight: 5 }}
            >
              <Scene key="userRegister"
                component={UserLogin}
              />
            </Scene>
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
