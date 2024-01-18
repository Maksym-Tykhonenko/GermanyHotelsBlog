import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import ProfileRoute from './routes/ProfileRoute';
import HotelsRoute from './routes/HotelsRoute';
import NewsRoute from './routes/NewsRoute';


const App = () => {

  const Route = ({ isFatch }) => {
    if (isFatch) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Hello World !!!</Text>
        </View>
      )
    } return (
      <Tab.Navigator initialRouteName='Hotels'>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarActiveBackgroundColor: 'gold',
            tabBarInactiveBackgroundColor: '#000',
            tabBarIcon: ({ focused }) => {
          return (
            <AntDesign name="profile" style={{ color: focused ? '#fef8d9' : '#fef8d9', fontSize: 35,
              
            }} />)
        }
          }}
          name="Profile"
          component={ProfileRoute} />
        
        <Tab.Screen
        options={{
            headerShown: false,
            tabBarActiveBackgroundColor: 'gold',
            tabBarInactiveBackgroundColor: '#000',
            tabBarIcon: ({ focused }) => {
          return (
            <FontAwesome name="hotel" style={{ color: focused ? '#fef8d9' : '#fef8d9', fontSize: 35,
              
            }} />)
        }
          }}
          name="Hotels"
          component={HotelsRoute} />
        
        <Tab.Screen
        options={{
            headerShown: false,
            tabBarActiveBackgroundColor: 'gold',
            tabBarInactiveBackgroundColor: '#000',
            tabBarIcon: ({ focused }) => {
          return (
            <Entypo name="news" style={{ color: focused ? '#fef8d9' : '#fef8d9', fontSize: 35,
              
            }} />)
        }
          }}
          name="News"
          component={NewsRoute} />
      </Tab.Navigator>
    )
  };

  return (
    <NavigationContainer>
      <Route isFatch={false}/>
    </NavigationContainer>
    
  )
};

export default App;