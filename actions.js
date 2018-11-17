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
  },
  updateMessMenu: (messMenu) => {
    return {
      type: Constants.UPDATE_MESS_MENU,
      payload: messMenu
    }
  },
  updateUserCredentials: (credentials) => {
    return {
      Constants.UPDATE_USER_CREDENTIALS,
      payload: credentials
    }
  }
}

export default Actions
