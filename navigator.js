import React,{Component} from 'react';
import {StackNavigator,addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';
import AttendanceComponent from './Attendance.js'
import Home from './Home.js'

const AppNavigator  = StackNavigator({
  Home: {screen: Home},
  Attendance: {screen: AttendanceComponent}
},{
  initialRouteName: 'Home'
})

class Navigator extends Component<>{
  render(){
    return(
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.state
      })}
      />
    )
  }
}

const mapStateToProps = function(state){
  return {
    navigation: state.navigation
  }
}

export default connect(mapStateToProps)(Navigator)
