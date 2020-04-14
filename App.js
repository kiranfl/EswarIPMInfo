import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './components/splash';
import Main from './containers/main';
import {Provider, connect } from 'react-redux';
// import store from './store';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './reducers/mainReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const Stack = createStackNavigator();
const store = createStore(mainReducer, applyMiddleware(thunk));
// const store = createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)));

if(__DEV__) {
  import('./ReactronConfig').then(() => console.log('Reactotron Configured'))
}



function Apps() {
  
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

class App extends Component {
  render() {
    return (
      <Apps />
    );
  }
}

const mapStateToProps = (state) => {
  return (
    {
    }
  )
};


const AppWithNavigationState = connect(mapStateToProps)(App);
export default function NCAP() {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
}
