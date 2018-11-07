import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
const cheerio = require('react-native-cheerio')

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
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
        console.log("AAAAA")
        console.log(response)
        fetch("https://markattendance.webapps.snu.edu.in/public/application/index/summary",
         {"credentials":"include",
         "headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","accept-language":"en-US,en;q=0.9","cache-control":"max-age=0","upgrade-insecure-requests":"1"},
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
