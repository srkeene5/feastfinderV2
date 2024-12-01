import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';

// Authentication
import { useAuth } from '../UserComponents/Authorizer.tsx';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigate } from 'react-router-dom';

// Screens
import Home from './Home.tsx';
import AccountPage from '../SettingsPages/AccountComponents/Account.tsx';
import RestPage from '../RestPageComponents/RestPage.tsx';
import SettingsNav from '../SettingsPages/SettingsNavComponents/SettingsNav.tsx';
import SuggPage from '../SettingsPages/SupportPages/SuggPage.tsx';
import RepBPage from '../SettingsPages/SupportPages/RepBugPage.tsx';
import PastOrdersPage from '../SettingsPages/PastOrdersPage.tsx'; // Import PastOrdersPage

export type RootStackParamList = {
  Home: undefined;
  RestPage: { rid: number; rName: string; color: string };
  SettingsNav: { uid: number };
  AccountPage: { uid: number };
  SuggPage: { uid: number };
  RepBPage: { uid: number };
  PastOrdersPage: undefined; // Add PastOrdersPage to the type definitions
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Main(): JSX.Element {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/account/login'); // Redirect to login if no user is found
    }
  }, [user, navigate]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Main Page',
          }}
        />
        <Stack.Screen
          name='RestPage'
          component={RestPage}
          options={{
            title: 'Restaurant Page',
          }}
        />
        <Stack.Screen
          name='SettingsNav'
          component={SettingsNav}
          options={{
            title: 'Navigation Page',
          }}
        />
        <Stack.Screen
          name='AccountPage'
          component={AccountPage}
          options={{
            title: 'Account Page',
          }}
        />
        <Stack.Screen
          name='SuggPage'
          component={SuggPage}
          options={{
            title: 'Suggestions Page',
          }}
        />
        <Stack.Screen
          name='RepBPage'
          component={RepBPage}
          options={{
            title: 'Report Bugs Page',
          }}
        />
        {/* Add PastOrdersPage to the navigation stack */}
        <Stack.Screen
          name='PastOrdersPage'
          component={PastOrdersPage}
          options={{
            title: 'Past Orders',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
