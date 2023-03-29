import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Beranda, Jelajah, Rekomendasi, Profil, Splash, Untukmu, Login} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BerandaStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BerandaScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="BerandaScreen"
        component={Beranda}
        options={{headerMode: 'none'}}
        // options={{headerShown: false}}/
      />
    </Stack.Navigator>
  );
};

const JelajahStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="JelajahScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="JelajahScreen"
        component={Jelajah}
        options={{headerMode: 'none'}}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const RekomendasiStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Rekomendasi"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Rekomendasi"
        component={Untukmu}
        options={{headerMode: 'none'}}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ProfilStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfilScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ProfilScreen"
        component={Profil}
        options={{headerMode: 'none'}}
      />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName="Beranda">
      <Tab.Screen name="Beranda" component={BerandaStack} />
      <Tab.Screen name="Jelajah" component={JelajahStack} />
      <Tab.Screen name="Untukmu" component={RekomendasiStack} />
      <Tab.Screen name="Profil" component={ProfilStack} />
    </Tab.Navigator>
  );
};

export default MainApp;

const styles = StyleSheet.create({});
