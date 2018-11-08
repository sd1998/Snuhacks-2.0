import React,{Component} from 'react';
import {View} from 'react-native';

export default class Home extends Component<>{

  navigateToAttendance(){
 
  }

  render(){
    return(
      <View>
      <Button
      title="Attendance"
      onPress={navigateToAttendance}/>
      </View>
    )
  }
}
