import React,{Component} from 'react';
import {View,Button} from 'react-native';
import {connect} from 'react-redux';
const cheerio = require('react-native-cheerio');
import Actions from './actions.js';

function mapStateToProps(state){
  return {
    currentAttendance: state.attendance.currentAttendance,
    userCredentials: stat.auth.user
  }
}

function mapDispatchToProps(dispatch){
  return{
    updateCurrentAttendance : (currentAttendance) => {
      dispatch(Actions.updateCurrentAttendance(currentAttendance))
    }
  }
}

class AttendanceComponent extends Component{
  constructor(props){
    super(props)
  }

  getAttendance = () => {
    fetch("https://markattendance.webapps.snu.edu.in/public/application/login/loginAuthSubmit",
    {
      "method": "POST",
      "credentials":"same-origin",
      "headers":{
        "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "accept-language":"en-US,en;q=0.9",
        "cache-control":"max-age=0",
        "content-type":"application/x-www-form-urlencoded",
        "upgrade-insecure-requests":"1"},
        "referrer":"https://markattendance.webapps.snu.edu.in/public/application/login/login",
        "referrerPolicy":"no-referrer-when-downgrade",
        "body":"login_user_name=" + this.props.userCredentials.username + "&login_password=" + this.props.userCredentials.password,
        "method":"POST",
        "mod//e":"cors"
      }).then((response) => {
      fetch("https://markattendance.webapps.snu.edu.in/public/application/index/summary",
       {
         "credentials":"include",
         "headers":{
           "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
           "accept-language":"en-US,en;q=0.9",
           "cache-control":"max-age=0",
           "upgrade-insecure-requests":"1"},
           "referrerPolicy":"no-referrer-when-downgrade",
           "body":null,
           "method":"GET",
           "mode":"cors"
         }).then((response) => {
         const $ = cheerio.load(response._bodyText)
         for(var i=0;i<$('tbody').children('tr').length;i++){
           var subd = ""
           var subdata = {}
           for(var j=0;j < $('tbody').children($('tr')[i]).children('td').length;j++){
             if(j == $('tbody').children($('tr')[i]).children('td').length - 1){
               subd = ($('tbody').children($('tr')[i]).children('td'))[j].children[0].children[0].data
             }
             else{
               subd = ($('tbody').children($('tr')[i]).children('td'))[j].children[0].data
             }
             switch(j){
               case 0:
               subdata.CourseCode = subd
               break
               case 1:
               subdata.CourseName = subd
               break
               case 2:
               subdata.EnrollmentDate = subd
               break
               case 3:
               subdata.ClassCond = subd
               break
               case 4:
               subdata.ClassAtten = subd
               break;
               case 5:
               subdata.OffiLeave = subd
               break;
               case 6:
               subdata.AttendancePer = subd
               break;
             }
           }
           this.props.updateCurrentAttendance(subdata)
         }
         }).catch((err) => {
           console.log(err)
           });
      }).catch((err) => {
        console.log(err)
      })
  }

  render(){
    return(
      <View>
      <Button
      title="Check Attendance"
      onPress={this.getAttendance}/>
      </View>
    )
  }
}

var AttendanceComponentR = connect(mapStateToProps,mapDispatchToProps)(AttendanceComponent)
export default AttendanceComponentR
