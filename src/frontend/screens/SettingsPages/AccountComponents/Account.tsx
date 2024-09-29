import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';

// navigation
import { useLocation } from 'react-router-dom';


export default function AccountPage() {
  const location = useLocation();
  const {uid} = location.state;

  return (
    <SafeAreaView>
      <CoreBanner />
      <View
      style={styles.account}
      >
        <Text
        style={styles.headingText}
        >
          Account: {uid}
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
  account: {
    alignItems: 'center'
  }
})