import React,{Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import AttendanceComponentR from './Attendance.js';
import MarkAttendanceR from './MarkAttendance.js';
import AttendanceCreditHoursR from './AttendanceCreditHours.js';
import MessMenuComponentR from './MessMenu.js';

const HomeNavigator = createBottomTabNavigator({
  Attendance: {
    screen: AttendanceComponentR
  },
  MarkAttendance: {
    screen: MarkAttendanceR
  },
  AttendanceCrH: {
    screen: AttendanceCreditHoursR
  },
  MessMenu: {
    screen: MessMenuComponentR
  }
})

export default class Home extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <HomeNavigator/>
    )
  }
}
