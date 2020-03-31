import * as React from 'react';
import DiseaseScreen from '../components/diseases';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PestsScreen from '../components/pests';

const Tab = createBottomTabNavigator();

function moreDetailsScreen({route, navigation}) {
  const screenProps = {
    id: route.params.data.id,
  };
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Diseases"
        component={DiseaseScreen}
        initialParams={{id: route.params.data.id}}
      />
      <Tab.Screen name="Pests" component={PestsScreen} />
    </Tab.Navigator>
  );
}

export default moreDetailsScreen;
