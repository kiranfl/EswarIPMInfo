import * as React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MoreDetailsScreen from './Containers/moredetails';
import PreviewScreen from './components/previewDisease';
import Splash from './components/splash';
import Main from './Containers/main';

const Stack = createStackNavigator();

function App() {
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

export default App;
