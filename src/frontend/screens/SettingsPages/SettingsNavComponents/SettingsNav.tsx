import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../../CoreComponents/CoreBanner';

// navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SettingsProps = NativeStackScreenProps<RootStackParamList, 'SettingsNav'>

export default function SettingsNav({route}: SettingsProps) {
  const {uid} = route.params

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
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
        onPress={() => navigation.navigate(
        "AccountPage", 
        {uid: uid}
        )}
        >
          <Text>
            Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(
        "RepBPage", 
        {uid: uid}
        )}
        >
          <Text>
            Report Bugs
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(
        "SuggPage", 
        {uid: uid}
        )}
        >
          <Text>
            Suggestions
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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