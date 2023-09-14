import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Beranda,
  Jelajah,
  Profil,
  Splash,
  Untukmu,
  DetailBerita,
  Login,
  Registrasi,
  MinatKategori,
  BeritaByKategori,
  BeritaByMedia,
  DaftarMedia,
  DetailSearch,
  RekomendasiByKategori,
  ForgotPassword,
  ResetPassword,
  TentangKami,
  Bantuan,
  HubungiKami
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Beranda"
        component={Beranda}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Jelajah"
        component={Jelajah}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Untukmu"
        component={Untukmu}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        // options={{headerMode: 'none'}}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        // options={{headerMode: 'none'}}
        options={{headerShown: false}}
        // options={{headerShown: false, cardStyleInterpolator: fadeConfig}}
      />

      <Stack.Screen
        name="Registrasi"
        component={Registrasi}
        // options={{headerMode: 'none'}}
        options={{headerShown: false}}
        // options={{headerShown: false, cardStyleInterpolator: fadeConfig}}
      />

      <Stack.Screen
        name="MainApp"
        component={MainApp}
        // options={{headerMode: 'none'}}
        options={{headerShown: false}}
        // options={{headerShown: false, cardStyleInterpolator: fadeConfig}}
      />

      <Stack.Screen
        name="MinatKategori"
        component={MinatKategori}
        // options={{headerMode: 'none'}}
        options={{headerShown: false}}
        // options={{headerShown: false, cardStyleInterpolator: fadeConfig}}
      />

      <Stack.Screen
        name="BeritaByKategori"
        component={BeritaByKategori}
        // options={{headerMode: 'none'}}
        options={{headerShown: false}}
        // options={{headerShown: false, cardStyleInterpolator: fadeConfig}}
      />

      <Stack.Screen
        name="BeritaByMedia"
        component={BeritaByMedia}
        // options={{headerMode: 'none'}}
        options={{headerShown: false}}
        // options={{headerShown: false, cardStyleInterpolator: fadeConfig}}
      />
      <Stack.Screen
        name="DetailBerita"
        component={DetailBerita}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DaftarMedia"
        component={DaftarMedia}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailSearch"
        component={DetailSearch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RekomendasiByKategori"
        component={RekomendasiByKategori}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TentangKami"
        component={TentangKami}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bantuan"
        component={Bantuan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HubungiKami"
        component={HubungiKami}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
