import React,{Component} from 'react';
import {View,Button} from 'react-native';
import {connect} from 'react-redux';
const cheerio = require('react-native-cheerio');
import Actions from './actions.js';

var mapStateToProps = (state) => {
  return {
    dh1Menu: state.messmenu.dh1Menu,
    dh2Menu: state.messmenu.dh2Menu
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    updateMessMenu: (messMenu) => {
      dispatch(Actions.updateMessMenu(messMenu))
    }
  }
}

class MessMenuComponent extends Component{
  constructor(props){
    super(props)
  }

  getMessMenu = () => {
      fetch("http://messmenu.snu.in/messMenu.php").then((response) => {
         const $ = cheerio.load(response._bodyText)
         var dh1Breakfast = ""
         var dh1Lunch = ""
         var dh1Dinner = ""
         var dh2Breakfast = ""
         var dh2Lunch = ""
         var dh2Dinner = ""
         for(var j=0;j<$('tbody').children('tr').eq(1).children('td').eq(1).children('p').length;j++){
           dh1Breakfast = dh1Breakfast + ", " + $('tbody').children('tr').eq(0).children('td').children('p').eq(j).text()
           dh2Breakfast = dh2Breakfast + ", " + $('tbody').children('tr').eq(1).children('td').children('p').eq(j).text()
         }
         for(var j=0;j<$('tbody').children('tr').eq(1).children('td').eq(2).children('p').length;j++){
           dh1Lunch = dh1Lunch + ", " + $('tbody').children('tr').eq(0).children('td').eq(2).children('p').eq(j).text()
           dh2Lunch = dh2Lunch + ", " + $('tbody').children('tr').eq(1).children('td').eq(2).children('p').eq(j).text()
         }
         for(var j=0;j<$('tbody').children('tr').eq(1).children('td').eq(3).children('p').length;j++){
           dh1Dinner = dh1Dinner + ", " + $('tbody').children('tr').eq(0).children('td').eq(3).children('p').eq(j).text()
           dh2Dinner = dh2Dinner + ", " + $('tbody').children('tr').eq(1).children('td').eq(3).children('p').eq(j).text()
         }
         var today = new Date()
         this.porps.updateMessMenu({
           lastUpdate: today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear(),
           dh1Menu: [dh1Breakfast,dh1Lunch,dh1Dinner],
           dh2Menu: [dh2Breakfast,dh2Lunch,dh2Dinner]
         })
      }).catch((err) => {
        console.log(err)
        });
  }

  render(){
    var dateToday = new Date()
    if(!(this.porps.dh1Menu.length == dateToday.getDate() + '-' + dateToday.getMonth() + '-' + dateToday.getFullYear())){
    return(
      <View>
      <Button
      title="Check Mess Menu"
      onPress={this.getMessMenu}/>
      </View>
    )
  } else{
    //Show mess menu here
    return (
      <View>
      <Button
      title="Refresh"
      onPress={this.getMessMenu}/>
      </View>
    )
  }
  }
}

var MessMenuComponentR = connect(mapStateToProps,mapDispatchToProps)(MessMenuComponent)
export default MessMenuComponentR
