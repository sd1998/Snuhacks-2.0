import React,{Component} from 'react';
import {View,Button} from 'react-native';
const cheerio = require('react-native-cheerio');
import {connect} from 'react-redux'
import Actions from './actions.js'

var mapStateToProps = (state) => {
  return {
    attendanceCreditHours: state.attendance.attendanceCreditHours
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    updateCreditHoursAttendance: (creditHoursAttendance) => {
      dispatch(Actions.updateCreditHoursAttendance(creditHoursAttendance))
    }
  }
}

class AttendanceCreditHours extends Component{
  constructor(props){
    super(props)
  }

  getAttendanceObject = (subd) => {
    if(subd.length > 0){
      return {
        ClassAttended: subd.substring(0,subd.indexOf('/')).trim(),
        ClassHeld: subd.substring(subd.indexOf('/')+1,subd.length).trim()
      }
    }
    return {
      ClassAttended: -1,
      ClassHeld: -1
    }
  }

  getAttendanceCreditHours = () => {
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
        "body":"login_user_name=sk261&login_password=Dnisg%4012344",
        "method":"POST",
        "mod//e":"cors"
      }).then((response) => {
        fetch("https://markattendance.webapps.snu.edu.in/public/application/index/crs_wise_att_ch",
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
                if(j == 0){
                  subd = ($('tbody').children($('tr')[i]).children('td'))[j].children[0].children[0].data
                }
                else{
                  subd = ($('tbody').children($('tr')[i]).children('td'))[j].children[0].data
                }
                if(subd == '-'){
                  subd = ""
                }
                switch(j){
                  case 0:
                  subdata.CourseName = subd
                  break
                  case 1:
                  subdata.LecCredits = subd
                  break
                  case 2:
                  subdata.TutCredits = subd
                  break
                  case 3:
                  subdata.PraCredits = subd
                  break
                  case 10:
                  subdata.AuthorizedAbs = subd
                  break;
                  case 11:
                  subdata.LecAttendanceCreditHr = this.getAttendanceObject(subd)
                  break;
                  case 12:
                  subdata.TutAttendanceCreditHr = this.getAttendanceObject(subd)
                  break;
                  case 13:
                  subdata.PraAttendanceCreditHr = this.getAttendanceObject(subd)
                  break;
                  case 14:
                  subdata.TotalAttendance = subd;
                  break;
                }
                if(j == 3){
                  j = 9
                }
            }
            if(subdata.CourseName){
            this.props.updateCreditHoursAttendance(subdata)
          }
          }
          }).catch((err) => {
            console.log(err)
          });
      }).catch((err) => {
        console.log(err)
      })
  }

  render(){
    return (
      <View>
      <Button
      title="Refresh"
      onPress={this.getAttendanceCreditHours}/>
      </View>
    )
  }
}

var AttendanceCreditHoursR = connect(mapStateToProps,mapDispatchToProps)(AttendanceCreditHours)
export default AttendanceCreditHoursR
