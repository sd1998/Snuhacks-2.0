import Constants from './constants.js';

const initialState = {
  lastUpdate: "",
  dh1Menu: [],
  dh2Menu: []
}

const messMenuReducer = (state = initialState,action) => {
  switch(action.type){
    case Constants.UPDATE_MESS_MENU:
    return {
      lastUpdate: action.payload.lastUpdate,
      dh1Menu: [action.payload.dh1Menu.slice(0)],
      dh2Menu: [action.payload.dh2Menu.slice(0)]
    }
    break;
    default:
    return state
  }
}

export default messMenuReducer
