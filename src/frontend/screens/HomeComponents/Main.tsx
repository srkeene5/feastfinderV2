//This component just interacts with the Home component. Is replacing what was in App.tsx

import React from 'react'
import {useEffect} from 'react'
import {View, SafeAreaView} from 'react-native'

//Authentication

import { useAuth } from '../UserComponents/Authorizer.tsx';


//Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigate } from 'react-router-dom';

//screens
import Home from './Home.tsx'
import AccountPage from '../SettingsPages/AccountComponents/Account.tsx'
import RestPage from '../RestPageComponents/RestPage.tsx'
import SettingsNav from '../SettingsPages/SettingsNavComponents/SettingsNav.tsx'
import SuggPage from '../SettingsPages/SupportPages/SuggPage.tsx'
import RepBPage from '../SettingsPages/SupportPages/RepBugPage.tsx'


export type RootStackParamList = {
  Home: undefined;
  RestPage: {rid: number, rName: string, color: string}
  SettingsNav: {uid: number}
  AccountPage: {uid: number}
  SuggPage: {uid: number}
  RepBPage: {uid: number}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function Main(): JSX.Element {

  const {user} = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    // Run on component load to check if user is logged in
    // console.log("in here!")

    if (!user) {
      navigate('/account/login'); // Redirect to login if no user is found
    }
  }, [user, navigate]); // Run this effect when user or navigate changes
  return (
    
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName='Home'
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen 
        name='Home'
        component={Home}
        options={{
          title: "Main Page"
        }}
        />
        <Stack.Screen 
        name='RestPage'
        component={RestPage}
        options={{
          title: "Restaurant Page"
        }}
        />
        <Stack.Screen 
        name='SettingsNav'
        component={SettingsNav}
        options={{
          title: "Navigation Page"
        }}
        />
        <Stack.Screen 
        name='AccountPage'
        component={AccountPage}
        options={{
          title: "Account Page"
        }}
        />
        <Stack.Screen 
        name='SuggPage'
        component={SuggPage}
        options={{
          title: "Suggestions Page"
        }}
        />
        <Stack.Screen 
        name='RepBPage'
        component={RepBPage}
        options={{
          title: "Report Bugs Page"
        }}
        /> 
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default Main;