import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Easing } from 'react-native';
import {NavigationContainer, StackActions} from "@react-navigation/native";
import {createStackNavigator,TransitionPresets,CardStyleInterpolators} from "@react-navigation/stack";
import homeScreen from './src/screens/homeScreen';
import settingsScreen from './src/screens/settingsScreen';
import feedScreen from './src/screens/feedScreen';
import detailsScreen from './src/screens/detailsScreen';
//import { Easing } from 'react-native-reanimated';
import {Ionicons} from "@expo/vector-icons";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Stack=createStackNavigator();
const Tab=createBottomTabNavigator();

const HomeStack=createStackNavigator();




const HomeStackNavigator=({navigation,route})=>{
  if(route.state)
  {
    navigation.setOptions({
      tabBarVisible:route.state.index>0?false:true
    })
  }
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={homeScreen} />
      <HomeStack.Screen name="Details" component={detailsScreen} />
    </HomeStack.Navigator>
  )
};






function getHeaderTitle(route){
  const routeName=route.state?route.state.routes[route.state.index].name
  :'Home'
  switch(routeName)
  {
    case "Home":
      return "Home"
    case "Feed":
      return "Feed"
    case "Settings":
      return "Settings"
          
  }
}






function shouldHeaderBeShown(route){
  const routeName=route.state?route.state.routes[route.state.index].name
  :'Home'
  switch(routeName)
  {
    case 'Home':
      return false
  }
}






const HomeTabNavigator=({navigation,route})=>{
  //navigation.setOptions({headerTitle:getHeaderTitle(route)});
  return(
    <Tab.Navigator screenOptions={({route})=>({
      tabBarIcon:({color,size})=>{
        let iconName
        if(route.name=="Home")
        {
          iconName="ios-home"
        }
        else if(route.name=="Feed")
        {
          iconName="logo-res"
        }
        else if(route.name=="Settings")
        {
          iconName="ios-settings"
        }
        return <Ionicons name={iconName} size={size} color={color} />
      }
    })}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Feed" component={feedScreen} />
      <Tab.Screen name="Settings" component={settingsScreen} />
    </Tab.Navigator>
  )
}





const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping:false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};





const closeConfig = {
  animation: 'timing',
  config: {
    duration:500,
    easing:Easing.linear
  },
};





export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      gestureEnabled:true,
      gestureDirection:"horizontal",
      cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
      // transitionSpec:{
      //   open: config,
      //   close:closeConfig
      // }
      
    }}
    headerMode="float">
      <Stack.Screen name="Home" component={HomeTabNavigator} 
      options={({route})=>({
        title:getHeaderTitle(route),
        headerShown:shouldHeaderBeShown(route)
      })}

      />
      <Stack.Screen name="Settings" component={settingsScreen} />
    </Stack.Navigator>
  </NavigationContainer>);
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
