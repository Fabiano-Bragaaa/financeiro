import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home} from '../pages/Home';

const Drawer = createDrawerNavigator();

export function AppRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="home" component={Home} />
    </Drawer.Navigator>
  );
}