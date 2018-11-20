import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import NavigatorR,{navReducer,navigationReduxMiddleware} from './navigator.js';
import logger from 'redux-logger';
import attendanceReducer from './attendanceReducer.js';
import messMenuReducer from './messMenuReducer.js';
import authReducer from './authReducer.js'
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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
const store = createStore(reducers,applyMiddleware(logger,navigationReduxMiddleware))
//pReducer to be used instead
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
