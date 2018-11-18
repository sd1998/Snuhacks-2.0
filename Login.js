import React,{Component} from 'react';
import {View,Button,TextInput,Text} from 'react-native';
const cheerio = require('react-native-cheerio');
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Actions from './actions.js';

mapDispatchToProps = (dispatch) => {
  return {
    updateUserCredentials: (user) => {
      dispatch(Actions.updateUserCredentials(user))
    }
  }
}

class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      errorMessage: ""
    }
  }

  isLChar = (val) => {
    if(val >= 95 && val <= 120){
      return true
    }
    return false
  }

  isUChar = (val) => {
    if(val >= 65 && val <= 90){
      return true
    }
    return false
  }

  isNum = (val) => {
    if(val >= 48 && val <= 57){
      return true
    }
    return false
  }

  checkUsername = () => {
    var chars = 0,nums = 0
    for(var i=0;i<this.state.username.length;i++){
      var val = this.state.username.charCodeAt(i)
      if(this.isLChar(val) || this.isUChar(val)){
        chars++
      } else if(this.isNum(val)){
        nums++
      }
    }
    if(chars == 2 && nums == 3){
      return true
    }
    return false
  }

  checkPassword = () => {
    var specialChar = 0,num = 0,char = 0,uChar = 0
    for(var i=0;i<this.state.password.length;i++){
      var val = this.state.password.charCodeAt(i)
      if(this.isUChar(val)){
        uChar = 1
      }
      if(this.isLChar(val) || this.isUChar(val)){
        char = 1
      } else if(this.isNum(val)){
        num = 1
      } else{
        specialChar = 1
      }
      if(num == 1 && char == 1 && uChar == 1 && specialChar == 1){
        return true
      }
    }
    return false
  }

  navigateToHome = () => {
    const navigate = NavigationActions.navigate({
      routeName: "Home"
    })
    this.props.navigation.dispatch(navigate)
  }

  signin = () => {
    if(this.state.password.length < 8 || this.state.username.length < 5 || !this.checkUsername() || !this.checkPassword()){
        this.setState({errorMessage: "Invalid credentials"})
    } else{
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
          "body":"login_user_name=" + this.state.username + "&login_password=" + encodeURIComponent(this.state.password),
          "method":"POST",
          "mod//e":"cors"
      }).then((response) => {
        const $ = cheerio.load(response._bodyText)
        if($('.alert-warning').length != 0){
          this.setState({errorMessage: "Incorrect credentials"})
        } else{
          this.setState({errorMessage: ""})
          this.props.updateUserCredentials({username: this.state.username,password: encodeURIComponent(this.state.password)})
          this.navigateToHome()
        }
      }).catch((err) => {
        console.log(err)
      });
    }
  }

  render(){
    return (
      <View>
      <View>
      {
        this.state.errorMessage.length > 0 && <Text style={{color: 'red'}}> {this.state.errorMessage} </Text>
      }
      </View>
      <TextInput
      placeholder="Username"
      onChangeText={(username) => this.setState({username: username})}/>
      <TextInput
      plcaholder="Password"
      secureTextEntry
      onChangeText={(password) => this.setState({password: password})}/>
      <Button
      title="Login"
      onPress={this.signin}/>
      </View>
    )
  }
}

var LoginR = connect(null,mapDispatchToProps)(Login)
export default LoginR
