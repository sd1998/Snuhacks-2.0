import React,{Component} from 'react';
import {View,Button} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default class Home extends Component{

  constructor(props){
    super(props)
  }

  navigateToCheckAttendance = () => {
    const navigate = NavigationActions.navigate({
      routeName: "Attendance"
    })
    this.props.navigation.dispatch(navigate)
  }

  navigateToMarkAttendance = () => {
    const navigate = NavigationActions.navigate({
      routeName: "MarkAttendance"
    })
    this.props.navigation.dispatch(navigate)
  }

  navigateToAttendanceCreditHours = () => {
    const navigate = NavigationActions.navigate({
      routeName: "AttendanceCreditHours"
    })
    this.props.navigation.dispatch(navigate)
  }

  navigateToMessMenu = () => {
    const navigate = NavigationActions.navigate({
      routeName: "MessMenu"
    })
    this.props.navigation.dispatch(navigate)
  }

  render(){
    return(
      <View>
      <Button
      title="Attendance"
      onPress={this.navigateToCheckAttendance}/>
      <Button
      title="Mark Attendance"
      onPress={this.navigateToMarkAttendance}/>
      <Button
      title="Attendance(Credit hours)"
      onPress={this.navigateToAttendanceCreditHours}/>
      <Button
      title="Mess Menu"
      onPress={this.navigateToMessMenu}/>
      </View>
    )
  }
}
