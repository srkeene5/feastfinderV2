import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const {uid} = location.state;

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <CoreBanner/>
          <Text
          style={styles.headingText}
          >
            NavigationPage: {uid}
          </Text>
        </View>
        <View>
          <TouchableOpacity
          style={styles.card}
          onPress={() => {navigate('/AccountPage', {state: {uid: 86}})}}
          >
            <Text>
              Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.card}
          onPress={() => {navigate('/ReportBugPage', {state: {uid: 86}})}}
          >
            <Text>
              Report Bugs
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
          style={styles.card}
          onPress={() => {navigate('/SuggestionPage', {state: {uid: 86}})}}
          >
            <Text>
              Suggestions
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    margin: 8,
    elevation: 5,
    shadowOffset: {
        width: 1,
        height: 1
    },
    shadowColor: '#333',
    shadowOpacity: .5,
    shadowRadius: 2,
    backgroundColor: 'lightblue',
  },
})