import Constants from './constants.js'

const initialState = {
  user: {}
}

const authReducer = (state = initialState,action) => {
  switch(action.type){
    case Constants.UPDATE_USER_CREDENTIALS:
    return {user:{
      username: action.payload.username,
      password: action.payload.password
    }}
    default:
    return state
  }
}

export default authReducer
