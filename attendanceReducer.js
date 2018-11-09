import Constants from './constants.js';

const initialState = {
  currentAttendance: []
}

const attendanceReducer = (state = initialState,action) => {
  switch(action.type){
    case Constants.UPDATE_CURRENT_ATTENDANCE:
    if(state.currentAttendance.length > 0){
      var index = -1
      for(var i=0;i<state.currentAttendance.length;i++){
        if(state.currentAttendance[i].courseCode == action.payload.CourseCode){
          index = i
          break;
        }
      }
      if(index == -1){
        return {
          currentAttendance: [...state.currentAttendance,action.payload]
        }
      } else{
        return {
          currentAttendance: [...state.currentAttendance.slice(0,index),action.payload,...state.currentAttendance.slice(index+1)]
        }
      }
    } else{
      return {
        currentAttendance: [action.payload]
      }
    }
    break;
    default:
    return state
  }
}

export default attendanceReducer
