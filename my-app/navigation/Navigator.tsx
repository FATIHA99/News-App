import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsOverView from '../screens/NewsOverView'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Saved from '../screens/Saved'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();


function HomeScreen() {
    return (
    <Tab.Navigator screenOptions={{headerShown:false}} >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Saved" component={Saved} />
    </Tab.Navigator>
    )
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen  options={{headerShown:false}} name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="NewsOverView" component={NewsOverView} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}