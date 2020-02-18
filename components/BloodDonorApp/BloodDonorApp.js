import React from 'react';
import { 
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer 
} from "react-navigation";
import HomeScreen from './HomeScreen/HomeScreen';
import SearchScreen from './SearchScreen/SearchScreen';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import DetailsScreen from './DetailsScreen/DetailsScreen';
import AddScreen from './AddScreen';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// creating stack of the possible navigations from Home Screen
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  Add: AddScreen,
});

// Removing tab bar from the Details Screen
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchScreen,
    Settings: SettingsScreen,
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
