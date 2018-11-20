import React,{Component} from 'react';
import {createBottomTabNavigator,createStackNavigator} from 'react-navigation';
import AttendanceComponentR from './Attendance.js';
import MarkAttendanceR from './MarkAttendance.js';
import AttendanceCreditHoursR from './AttendanceCreditHours.js';
import MessMenuComponentR from './MessMenu.js';

const Navigator = createBottomTabNavigator({
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

const TabNavigator = createStackNavigator({Navigator},{headerMode: "none"})
export default TabNavigator
