import React,{Component} from 'react';
import {View,Icon} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import BottomNavigation,{FullTab} from 'react-native-material-bottom-navigation';
import AttendanceComponentR from './Attendance.js';
import MarkAttendanceR from './MarkAttendance.js';
import AttendanceCreditHoursR from './AttendanceCreditHours.js';
import MessMenuComponentR from './MessMenu.js';

class Navigator extends Component{
  tabs = [
    {
      key: 'Atten',
      label: 'Check',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'MkAtten',
      label: 'Attendance',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'AttCrH',
      label: 'Credit Hours',
      barColor: '#E64A19',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'Mess Menu',
      label: 'MessMenu',
      barColor: '#E64A19',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ]

  constructor(props){
    super(props)
    this.state = {
      activeTab: 'Atten'
    }
  }

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon}
    />
  )

  render(){
    return (
      <View style={{ flex: 1 }}>
       <View style={{ flex: 1 }}>
         {
           this.state.activeTab == 'Atten' && <AttendanceComponentR/>
         }
         {
           this.state.activeTab == 'MkAtten' && <MarkAttendanceR/>
         }
         {
           this.state.activeTab == 'AttCrH' && <AttendanceCreditHoursR/>
         }
         {
           this.state.activeTav == 'MessMenu' && <MessMenuComponentR/>
         }
       </View>
       <BottomNavigation
         onTabPress={newTab => this.setState({ activeTab: newTab.key })}
         renderTab={this.renderTab}
         tabs={this.tabs}
       />
     </View>
    )
  }
}

const TabNavigator = createStackNavigator({Navigator},{headerMode: "none"})
export default TabNavigator
