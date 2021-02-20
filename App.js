/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {Container, Body, Title} from 'native-base';
import App from './component/splashScreen';
import Welcome from './component/WelcomeScreen';
import LoginScreen from './component/Login';
import  AdminLogin  from './component/Adminlogin';
import Register from './component/Register';
import General from './component/General';
import MyServices from './component/MyServices';
import Notification from './component/Notification';
import AboutUs from './component/AboutUs';
import Announcements from './component/Announcements';
import DonateUs from './component/DonateUs';
import OurServices from './component/OurServices';
import Settings from './component/Settings';
import Update_Profile from './component/Update_Profile';
import Nav from './component/navigator/DrawerNavigator';
import AdNav from './component/Adminnavigator/AdDrawerNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RouteNav1 from './component/Adminnavigator/AdDrawerNavigator';
import AdminAnnouncements from './component/AdminAnnouncement';
import AdminEvents from './component/AdminEvents';
import AdminBudget from './component/Budget';

import Education from './component/Services/Education';
import HouseHelp from './component/Services/Househelp';
import Medical from './component/Services/Medical';
import MarriageHelp from './component/Services/Marriagehelp';
import Arbitration from './component/Services/Arbitration';
import GraveYard from './component/Services/GraveYard';
import Employement from './component/Services/Employment';
import YouthandIT from './component/Services/YouthandIT';


import Services from './component/Services';
import AdminServices from './component/AdminServices';
import getalluser from "./component/Allusers";

import Checktab from "./component/checktab";
 
import Events from './component/Events'
import { floor } from 'react-native-reanimated';

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={App}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
        name="AdminLogin"
        component={AdminLogin}
        options={{headerShown: false}}
        />
        
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="General"
          component={General}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Nav"
          component={Nav}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="Adnav"
          component={AdNav}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Nav1"
          component={RouteNav1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Announcement"
          component={Announcements}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Events"
          component={Events}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DonateUs"
          component={DonateUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OurServices"
          component={OurServices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Update_Profile"
          component={Update_Profile}
          options={{headerShown: false}}
        />
        
        <Stack.Screen
          name="Services"
          component={Services}
          options={{headerShown: false}}
        />
        <Stack.Screen
        name="AdminAnnouncements"
        component={AdminAnnouncements}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="getalluser"
        component={getalluser}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="AdminEvents"
        component={AdminEvents}
        options={{headerShown: false}}
        />
         <Stack.Screen
        name="AdminBudget"
        component={AdminBudget}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="AdminServices"
        component={AdminServices}
        options={{headerShown: false}}
        />
         <Stack.Screen
        name="Education"
        component={Education}
        options={{headerShown: false}}
        />
          <Stack.Screen
        name="househelp"
        component={HouseHelp}
        options={{headerShown: false}}
        />
         <Stack.Screen
        name="Medical"
        component={Medical}
        options={{headerShown: false}}
        />
         <Stack.Screen
        name="Marriagehelp"
        component={MarriageHelp}
        options={{headerShown: false}}
        />
         <Stack.Screen
        name="Arbitration"
        component={Arbitration}
        options={{headerShown: false}}
        />
         <Stack.Screen
        name="GraveYard"
        component={GraveYard}
        options={{headerShown: false}}
        />
         <Stack.Screen
        name="Employement"
        component={Employement}
        options={{headerShown: false}}
        />
         <Stack.Screen
        name="YouthandIT"
        component={YouthandIT}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="Checktab"
        component={Checktab}
        options={{headerShown: false}}
        />



      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default MainApp;
