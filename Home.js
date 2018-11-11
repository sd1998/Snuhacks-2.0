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

  render(){
    return(
      <View>
      <Button
      title="Attendance"
      onPress={this.navigateToCheckAttendance}/>
      <Button
      title="Mark Attendance"
      onPress={this.navigateToMarkAttendance}/>
      </View>
    )
  }
}
