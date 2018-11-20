import {createStackNavigator} from 'react-navigation';
import {reduxifyNavigator,createReactNavigationReduxMiddleware,createNavigationReducer} from 'react-navigation-redux-helpers';
import {addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';
import LoginR from './Login.js';
import Home from './Home.js';

const AppNavigator  = createStackNavigator({
  Login: {
    screen: LoginR,
    navigationOptions: {
      headerLeft: null
    }
  },
  Home: {screen: Home}
},{
  initialRouteName: "Login"
})

export const navReducer = createNavigationReducer(AppNavigator)

export const navigationReduxMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
)

const Navigator = reduxifyNavigator(AppNavigator,"root")

const mapStateToProps = function(state){
  return {
    state: state.nav
  }
}

const NavigatorR = connect(mapStateToProps)(Navigator)
export default NavigatorR
