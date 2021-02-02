import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  LoginScreen,
  HomeRouter,
  Dashboard,
} from './screens';

const Router = createStackNavigator(
  {
    LoginScreen,
    HomeRouter,
    Dashboard,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
