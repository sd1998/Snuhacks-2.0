import React,{Component} from 'react';
import {View,Button,TextInput,Text} from 'react-native';
const cheerio = require('react-native-cheerio');
import Actions from './actions.js'

mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

mapDispatchToProps = (dispatch) => {
  return {
    updateUserCredentials = (user) => {
      dispatch(Actions.updateUserCredentials(user))
    }
  }
}

class Login extends Component{
  constructor(props){
    super(props)
    this.setState = {
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
    for(var i=0;i<this.state.username.length;i++){
      var val = this.state.username.charCodeAt(i)
      var chars = 0,nums = 0
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
    for(var i=0;i<this.state.password.length;i++){
      var val = this.state.password.charCodeAt(i)
      var specialChar = 0,num = 0,char = 0
      if(this.isLChar(val) || this.UChar(val)){
        char = 1
      } else if(this.isNum(val)){
        num = 1
      } else{
        specialChar = 1
      }
      if(num == 1 && char == 1 && specialChar == 1){
        return true
      }
    }
    return false
  }

  signin = () => {
    if(this.state.password.length < 8 || this.state.username.length < 5 || !this.checkUsername() || !this.checkPassword()){
        this.setState({errorMessage: "Invalid credentials"})
    } else{
      this.setState({errorMessage: ""})
      fetch("https://prodweb.snu.in/psp/CSPROD/EMPLOYEE/HRMS/?cmd=login",
      {
        "credentials":"include",
        "headers":{
          "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
          "accept-language":"en-US,en;q=0.9",
          "cache-control":"max-age=0",
          "upgrade-insecure-requests":"1"
        },
        "referrer":"https://snulinks.snu.edu.in/",
        "referrerPolicy":"no-referrer-when-downgrade",
        "body":"login_user_name=" + this.state.username + "&login_password=" + encodeUriComponent(this.state.password),
        "method":"GET",
        "mode":"cors"
      }).then((response) => {
        console.log(response)
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
      onChange={(username) => this.setState({username: username})}/>
      <TextInput
      plcaholder="Password"
      secureTextEntry
      onChange={(password) => this.setState({password: password})}/>
      <Button
      title="Login"
      onPress={this.signin}/>
      </View>
    )
  }
}

var LoginR = connect(mapStateToProps,mapDispatchToProps)(Login)
export default LoginR
