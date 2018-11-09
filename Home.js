import React,{Component} from 'react';
import {View,Button} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default class Home extends Component{

  constructor(props){
    super(props)
  }

  navigateToAttendance = () => {
    const navigate = NavigationActions.navigate({
      routeName: "Attendance"
    })
    this.props.navigation.dispatch(navigate)
  }

  render(){
    return(
      <View>
      <Button
      title="Attendance"
      onPress={this.navigateToAttendance}/>
      </View>
    )
  }
}
