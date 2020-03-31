import * as React from 'react';
import {Button, View, Text} from 'react-native';
import { DrawerActions } from '@react-navigation/native';

function PestsScreen(navigation, props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Pests</Text>
    </View>
  );
}

export default PestsScreen;