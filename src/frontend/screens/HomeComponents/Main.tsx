//This component just interacts with the Home component. Is replacing what was in App.tsx

import React from 'react'
import {View, SafeAreaView} from 'react-native'

//Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'



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

function App(): JSX.Element {
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

export default App;