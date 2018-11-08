import {AppNavigator} from './navigator.js';
import {NavigationActions} from 'react-navigation';

const initialAction = {type: NavigationActions.Init}
const initialState = AppNavigator.router.getStateForAction(initialAction)

export default (state = initialState,action) => {
  switch(action.type){
    default:
    return AppNavigator.router.getStateForAction(action,state)
  }
}
