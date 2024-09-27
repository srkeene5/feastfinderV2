import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';

//navigation
import { useLocation } from 'react-router-dom';

export default function SuggPage() {
  const location = useLocation();
  const {uid} = location.state;

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