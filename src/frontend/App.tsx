import React from 'react'

//Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//screens
import Home from './screens/HomeComponents/Home.tsx'
import AccountPage from './screens/SettingsPages/AccountComponents/Account.tsx'
import RestPage from './screens/RestPageComponents/RestPage.tsx'
import SettingsNav from './screens/SettingsPages/SettingsNavComponents/SettingsNav.tsx'
import SuggPage from './screens/SettingsPages/SupportPages/SuggPage.tsx'
import RepBPage from './screens/SettingsPages/SupportPages/RepBugPage.tsx'
import Example from './screens/Brian_Test_Components/Example.tsx'
import Login from './screens/Brian_Test_Components/Login.tsx'

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
    <div> <Login /> 
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
    </div>
  )
}

export default App;