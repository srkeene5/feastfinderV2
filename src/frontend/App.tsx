import { View, Text } from 'react-native'
import React from 'react'

//Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//screens
import Home from './screens/HomeComponents/Home'
import AccountPage from './screens/SettingsPages/AccountComponents/Account'
import RestPage from './screens/RestPageComponents/RestPage'
import SettingsNav from './screens/SettingsPages/SettingsNavComponents/SettingsNav'
import SuggPage from './screens/SettingsPages/SupportPages/SuggPage'
import RepBPage from './screens/SettingsPages/SupportPages/RepBugPage'

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
          title: "Acount Page"
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
  )
}

export default App;