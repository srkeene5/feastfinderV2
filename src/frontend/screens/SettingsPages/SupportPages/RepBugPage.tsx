import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';

// navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App.tsx";
import { SafeAreaView } from 'react-native-safe-area-context';

type RepBProps = NativeStackScreenProps<RootStackParamList, 'RepBPage'>

export default function RepBPage({route}: RepBProps) {
  const {uid} = route.params

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