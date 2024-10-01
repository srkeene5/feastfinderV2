import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../CoreComponents/CoreBanner.tsx';

// navigation
import { useLocation } from 'react-router-dom';

export default function RestPage() {
  const location = useLocation();
  const {restaurant, service} = location.state;

  return (
    <SafeAreaView>
      <CoreBanner />
      <View
      style={[styles.account]}
      >
        <Text
        style={styles.headingText}
        >
          Service: {service}
        </Text>
        <Text
        style={styles.headingText}
        >
          Restaurant Name: {restaurant.restaurantName}
        </Text>
        <Text
        style={styles.headingText}
        >
          Restaurant ID: {restaurant.restaurantID}
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