import Constants from './constants.js';

const initialState = {
  currentAttendance: [],
  attendanceCreditHours: []
}

const attendanceReducer = (state = initialState,action) => {
  switch(action.type){
    case Constants.UPDATE_CURRENT_ATTENDANCE:
    if(state.currentAttendance.length > 0){
      var index = -1
      for(var i=0;i<state.currentAttendance.length;i++){
        if(state.currentAttendance[i].CourseCode == action.payload.CourseCode){
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
    case Constants.UPDATE_CREDIT_HOURS_ATTENDANCE:
    if(state.attendanceCreditHours.length > 0 && state.attendanceCreditHours[0] != null){
      var index = -1
      for(var i=0;i<state.attendanceCreditHours.length;i++){
        if(state.attendanceCreditHours[i].CourseName.substring(0,state.attendanceCreditHours[i].CourseName.indexOf('-')).trim()
         == action.payload.CourseName.substring(0,action.payload.CourseName.indexOf('-')).trim()){
          index = i
          break;
        }
      }
      if(index == -1){
        return {
          attendanceCreditHours: [...state.attendanceCreditHours,action.payload]
        }
      } else{
        return {
          attendanceCreditHours: [...state.attendanceCreditHours.slice(0,index),action.payload,...state.attendanceCreditHours.slice(index+1)]
        }
      }
    } else{
      return {
        attendanceCreditHours: [action.payload]
      }
    }
    break;
    default:
    return state
  }
}

export default attendanceReducer
