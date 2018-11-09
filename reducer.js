import {AppNavigator,InitState} from './navigator.js';
import {NavigationActions} from 'react-navigation';

const reducer = (state = InitState,action) => {
  const newState = AppNavigator.router.getStateForAction(action,state)
  return newState || state
/*  switch(action.type){
    default:

  }*/
}

export default reducer
