import Navigator from './navigator.js';
import {NavigationActions} from 'react-navigation';

const initialAction = {type: NavigationActions.Init}
const initialState = Navigator.route.getStateForAction(initialAction)

export default (state = initialState,action) => {
  return {...state}
}
