import * as React from 'react';
import DetailsScreen from '../components/Details';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View} from 'react-native';
import Root from './Root';
import StarwberryVegetable from '../components/strawberriesAndVegie';
import PestsNews from '../components/pestsNews';
import VideosScreen from '../components/VideosScreen';
import FeedBack from '../components/feedBack';

function CustomDrawerContent(props) {
  return (
    <View style={{backgroundColor: 'rgb(255,255,255)', flex: 1, paddingTop: 0, marginTop: 0}}>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label='IPMINFO'
          style={{
            backgroundColor: '#FFC300',
            fontWeight: 'bold',
            height: hp('8%'),
            paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0
          }}
          labelStyle={{
            color: '#fff',
            fontSize: wp('5%'),
            marginLeft: wp('15%'),
            fontWeight: 'bold',
          }}
        />
        <DrawerItemList
          {...props}
          activeBackgroundColor={'rgb(220,220,220)'}
          activeTintColor={'rgb(105,105,105)'}
          labelStyle={{fontSize: wp('4%')}}
          itemStyle = {{paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingBottom: 0, marginBottom: 0}}
        />
      </DrawerContentScrollView>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function Main() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Farm Crops" component={Root} />
      <Drawer.Screen name="Videos" component={VideosScreen} />
      <Drawer.Screen name="Feedback" component={FeedBack} />
      <Drawer.Screen
        name="Strawberries-Vegetables"
        component={StarwberryVegetable}
      />
      <Drawer.Screen name="PestNews" component={PestsNews} />
    </Drawer.Navigator>
  );
}

export default Main;
