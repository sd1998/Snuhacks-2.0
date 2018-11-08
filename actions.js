import Constants from './constants.js';

const Actions = {
  updateCurrentAttendance: (currentAttendance) => {
    return {
      type: Constants.UPDATE_CURRENT_ATTENDANCE,
      currentAttendance: currentAttendance
    }
  }
}

export default Actions
