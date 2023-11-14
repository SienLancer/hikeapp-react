import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import Database from "./Database";
import DetailScreen from "./screens/DetailScreen";
import EntryScreen from "./screens/EntryScreen";
import HomeScreen from "./screens/HomeScreen";
import UpdateScreen from "./screens/UpdateScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">


        <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Entry" component={EntryScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Update" component={UpdateScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
};
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        showLabel: false,
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#04BF8A',
          height: 60,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#014A35',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }
          return <Ionic name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="New" component={EntryScreen} />
    </Tab.Navigator>


  );
}

export default App;