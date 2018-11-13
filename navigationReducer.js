import {AppNavigator,InitState} from './navigator.js';
import {NavigationActions} from 'react-navigation';

const navReducer = (state = InitState,action) => {
  const newState = AppNavigator.router.getStateForAction(action,state)
  return newState || state
}

export default navReducer
