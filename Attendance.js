import React,{Component} from 'react';
import {Platform,StyleSheet,Text,View} from 'react-native';
const cheerio = require('react-native-cheerio');
import {connect} from 'react-redux/native';
import * as Actions from './action.js';

function mapStateToProps(state){
  return {
    currentAttendance: state.currentAttendance
  }
}

function mapDispatchToProps(dispatch){
  return{
    updateCurrentAttendance : function(currentAttendance){
      dispatch(Actions.updateCurrentAttendance(currentAttendance))
    }
  }
}

export default class AttendanceComponent extends React.Component{
  constructor(){

  }

  getAttendance() {
    fetch("https://markattendance.webapps.snu.edu.in/public/application/login/loginAuthSubmit",
    {"method": "POST","credentials":"same-origin",
    "headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "accept-language":"en-US,en;q=0.9",
    "cache-control":"max-age=0",
    "content-type":"application/x-www-form-urlencoded",
    "upgrade-insecure-requests":"1"},
    "referrer":"https://markattendance.webapps.snu.edu.in/public/application/login/login",
    "referrerPolicy":"no-referrer-when-downgrade",
    "body":"login_user_name=sk261&login_password=Dnisg%4012344","method":"POST","mod//e":"cors"}).then((response) => {
      fetch("https://markattendance.webapps.snu.edu.in/public/application/index/summary",
       {"credentials":"include",
       "headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
       "accept-language":"en-US,en;q=0.9",
       "cache-control":"max-age=0",
       "upgrade-insecure-requests":"1"},
       "referrerPolicy":"no-referrer-when-downgrade",
       "body":null,
       "method":"GET",
       "mode":"cors"}).then((response) => {
         const $ = cheerio.load(response._bodyText)
         for(var i=0;i<$('tbody').children('tr').length;i++){
           for(var j=0;j < $('tbody').children($('tr')[i]).children('td').length;j++){
             if(j == $('tbody').children($('tr')[i]).children('td').length - 1){
               console.log(($('tbody').children($('tr')[i]).children('td'))[j].children[0].children[0].data)
             }
             else{
               console.log(($('tbody').children($('tr')[i]).children('td'))[j].children[0].data)
           }
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
    return(
      <View>
      <Button
      title="Check Attendance"
      onPress={getAttendance}/>
      </View>
    )
  }
}
