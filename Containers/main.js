import * as React from 'react';
import DetailsScreen from '../components/Details';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Root from './Root';
import StarwberryVegetable from '../components/strawberriesAndVegie';
import PestsNews from '../components/pestsNews';
import VideosScreen from '../components/VideosScreen';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function Main() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Farm Crops">
      <Drawer.Screen name="Farm Crops" component={Root} />
      <Drawer.Screen name="Discover" component={DetailsScreen} />
      <Drawer.Screen name="Meeting Handouts" component={DetailsScreen} />
      <Drawer.Screen name="Meeting Presentations" component={DetailsScreen} />
      <Drawer.Screen name="Videos" component={VideosScreen} />
      <Drawer.Screen name="About Us" component={DetailsScreen} />
      <Drawer.Screen name="Notifications" component={DetailsScreen} />
      <Drawer.Screen name="Preferences" component={DetailsScreen} />
      <Drawer.Screen name="Feedback" component={DetailsScreen} />
      <Drawer.Screen
        name="Strawberries-Vegetables"
        component={StarwberryVegetable}
      />
      <Drawer.Screen name="PestNews" component={PestsNews} />
    </Drawer.Navigator>
  );
}

export default Main;
