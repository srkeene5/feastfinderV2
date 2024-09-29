import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';

//navigation
import { useLocation } from 'react-router-dom';

export default function RepBPage() {
  const location = useLocation();
  const {uid} = location.state;

  return (
    <SafeAreaView>
      <CoreBanner />
      <View
      style={styles.reportBug}
      >
        <Text
        style={styles.headingText}
        >
          Report Bug Page: {uid}
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
  reportBug: {
    alignItems: 'center'
  }
})