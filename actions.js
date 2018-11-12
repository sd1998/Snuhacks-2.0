import Constants from './constants.js';

const Actions = {
  updateCurrentAttendance: (currentAttendance) => {
    return {
      type: Constants.UPDATE_CURRENT_ATTENDANCE,
      payload: currentAttendance
    }
  },
  updateCreditHoursAttendance: (creditHoursAttendance) => {
    return {
      type: Constants.UPDATE_CREDIT_HOURS_ATTENDANCE,
      payload: creditHoursAttendance
    }
  }
}

export default Actions
