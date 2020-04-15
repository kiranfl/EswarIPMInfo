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
import Header from '../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

function ButtonClick() {
  return <Text
  style={{
    marginLeft: wp('0.5%'),
    alignItems: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 25,
    top: hp('0.5%'),

  }}>
  IPMInfo
</Text>;
}

// const navigation = this.props.navigation;

function Root({navigation}, props) {
  return (
    <Stack.Navigator>
      {/* <Header navigation={navigation} /> */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: props => <ButtonClick {...props} />,
          headerStyle: {backgroundColor: 'rgb(235, 183, 52)'},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon
                style={{
                  // position: 'absolute',
                  left: wp('2%'),
                  top: hp('0.5%'),
                  width: 25,
                  height: 25,
                  marginLeft: 5,
                }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                size={25}
                name="navicon"
                backgroundColor="#3b5998"
                color="white"
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
