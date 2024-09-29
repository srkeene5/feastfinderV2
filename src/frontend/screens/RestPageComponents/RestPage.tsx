import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../CoreComponents/CoreBanner.tsx';

// navigation
import { useLocation } from 'react-router-dom';

export default function RestPage() {
  const location = useLocation();
  const {rid, rName, color, service} = location.state;

  return (
    <SafeAreaView>
      <CoreBanner />
      <View
      style={[styles.account, {backgroundColor: color}]}
      >
        <Text
        style={styles.headingText}
        >
          Service: {service}
        </Text>
        <Text
        style={styles.headingText}
        >
          Restaurant Name: {rName}
        </Text>
        <Text
        style={styles.headingText}
        >
          Restaurant ID: {rid}
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
    //alignItems: 'center',
    height: 110,
  }
})