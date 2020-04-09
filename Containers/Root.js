import * as React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MoreDetailsScreen from './moredetails';
import HomeScreen from '../components/Home';
import PreviewScreen from '../components/previewDisease';
import Splash from '../components/splash';

const Stack = createStackNavigator();

function ButtonClick() {
  return <Text>IPMinfo</Text>;
}

function Root({navigation}, props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: props => <ButtonClick {...props} />,
          headerStyle: {backgroundColor: 'rgb(235, 183, 52)'},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={{
                  uri:
                    'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png',
                }}
                style={{width: 25, height: 25, marginLeft: 5}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="MoreDetails"
        component={MoreDetailsScreen}
        options={{
          headerTitle: props => <Text>IPMinfo</Text>,
          headerStyle: {backgroundColor: 'rgb(235, 183, 52)'},
        }}
      />
      <Stack.Screen name="Preview" component={PreviewScreen} />
    </Stack.Navigator>
  );
}

export default Root;
