import React from 'react';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './HomeScreen/HomeScreen';
import SearchScreen from './SearchScreen/SearchScreen';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home'
        } else if (routeName === 'Search') {
          iconName = 'search'
        } else if (routeName === 'Settings') {
          iconName = 'sliders-h'
        }

        // You can return any component that you like here!
        return <FontAwesome5 name={iconName} size={25} color={tintColor} light />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato', //'#FF3333',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(TabNavigator);
