import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../CoreComponents/CoreBanner.tsx';

// navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App.tsx";
import { SafeAreaView } from 'react-native-safe-area-context';

type RestProps = NativeStackScreenProps<RootStackParamList, 'RestPage'>

export default function RestPage({route}: RestProps) {
    const {rid, rName, color} = route.params

  return (
    <SafeAreaView>
      <CoreBanner />
      <View
      style={[styles.account, {backgroundColor: color}]}
      >
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
    alignItems: 'center',
    height: 75,
  }
})