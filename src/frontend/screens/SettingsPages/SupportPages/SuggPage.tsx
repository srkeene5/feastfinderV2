import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';

// navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App.tsx";
import { SafeAreaView } from 'react-native-safe-area-context';

type SuggProps = NativeStackScreenProps<RootStackParamList, 'SuggPage'>

export default function SuggPage({route}: SuggProps) {
  const {uid} = route.params

  return (
    <SafeAreaView>
      <CoreBanner />
      <View
      style={styles.suggestions}
      >
        <Text
        style={styles.headingText}
        >
          Suggestions Page: {uid}
        </Text>
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
  suggestions: {
    alignItems: 'center'
  }
})