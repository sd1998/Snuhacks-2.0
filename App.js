/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
const cheerio = require('react-native-cheerio');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
      fetch("https://markattendance.webapps.snu.edu.in/public/application/login/loginAuthSubmit", {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","accept-language":"en-US,en;q=0.9","cache-control":"max-age=0","content-type":"application/x-www-form-urlencoded","upgrade-insecure-requests":"1"},"referrer":"https://markattendance.webapps.snu.edu.in/public/application/login/login","referrerPolicy":"no-referrer-when-downgrade","body":"login_user_name=sk261&login_password=Dnisg%4012344&valid_code=7958837296","method":"POST","mode":"cors"}).then((response) => {
        console.log(response)
        }).catch((err) => {
          console.log(err)
          })
    /*return fetch("https://markattendance.webapps.snu.edu.in/public/application/login/login").then((response) => {
      const $ = cheerio.load(response._bodyText)
      $(".panel-body").each(function(index,articles){
        console.log(articles)
      })
    }).catch((err) => {
      console.log(err)
    });*/
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
