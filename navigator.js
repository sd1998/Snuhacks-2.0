import React,{Component} from 'react';
import {StackNavigator,addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';
import Home from './Home.js'
import AttendanceComponentR from './Attendance.js'
import MarkAttendance from './MarkAttendance.js';
import AttendanceCreditHoursR from './AttendanceCreditHours.js';
import MessMenuComponentR from './MessMenu.js';

export const AppNavigator  = new StackNavigator({
  Home: {screen: Home},
  Attendance: {screen: AttendanceComponentR},
  MarkAttendance: {screen: MarkAttendance},
  AttendanceCreditHours: {screen: AttendanceCreditHoursR},
  MessMenu: {screen: MessMenuComponentR}
},{
  initialRouteName: "Home"
})

export const InitState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams("Home"))

class Navigator extends Component<>{
  render(){
    return(
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation
      })}
      />
    )
  }
}

const mapStateToProps = function(state){
  return {
    navigation: state.nav
  }
}

const NavigatorR = connect(mapStateToProps)(Navigator)

export default NavigatorR
