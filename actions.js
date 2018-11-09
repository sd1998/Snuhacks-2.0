import Constants from './constants.js';

const Actions = {
  updateCurrentAttendance: (currentAttendance) => {
    return {
      type: Constants.UPDATE_CURRENT_ATTENDANCE,
      payload: currentAttendance
    }
  }
}

export default Actions
