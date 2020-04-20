import * as React from 'react';
import DiseaseScreen from '../components/diseases';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PestsScreen from '../components/pests';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

function moreDetailsScreen({route, navigation}) {
  const screenProps = {
    id: route.params.data.id,
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'rgb(235, 183, 52)',
        labelStyle: {
          fontSize: 14,
        },
      }}>
      <Tab.Screen
        name="Diseases"
        component={DiseaseScreen}
        options={{
          tabBarLabel: 'Diseases',
          tabBarIcon: ({color, size}) => (
            <Image
              style={{width: 20, height: 20}}
              source={require('../assets/disease.png')}
            />
          ),
        }}
        initialParams={{id: route.params.data.id}}
      />
      <Tab.Screen
        name="PestScreen"
        component={PestsScreen}
        options={{
          tabBarLabel: 'Pests',
          tabBarIcon: ({color, size}) => (
            <Image
              style={{width: 25, height: 20}}
              source={require('../assets/pests.png')}
            />
          ),
        }}
        initialParams={{id: route.params.data.id}}
      />
    </Tab.Navigator>
  );
}

export default moreDetailsScreen;
