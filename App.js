
// ***************************************************************

// Do no upgrade react-navigation version(package.json)

/*
In case of error corresponding to navigator.js
Run the following commands:-

npm uninstall react-navigation
npm install --save react-navigation@1.0.0-beta.15
*/

// Workaround to be added soon.

// ****************************************************************

import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {persistStore,persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import NavigatorR from './navigator.js';
import navReducer from './navigationReducer.js';
import attendanceReducer from './attendanceReducer.js';
import messMenuReducer from './messMenuReducer.js';
import authReducer from './authReducer.js'

  //    <PersistGate loading={<ActivityIndicator size="large" color="#ffffff"/>} persistor={persistor}>
  //    </PersistGate>

const reducers = combineReducers({
  nav: navReducer,
  attendance: attendanceReducer,
  messmenu: messMenuReducer,
  auth: authReducer
})

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['nav']
}

//const pReducer = persistReducer(persistConfig,reducers)
const store = createStore(reducers,applyMiddleware(logger)) //pReducer to be used instead
//const persistor = persistStore(store)

export default class App extends Component<> {

  render() {
    return (
      <Provider store={store}>
      <NavigatorR/>
      </Provider>
    );
  }

}
