import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../../CoreComponents/CoreBanner';

// navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { SafeAreaView } from 'react-native-safe-area-context';

type AccountProps = NativeStackScreenProps<RootStackParamList, 'AccountPage'>

export default function AccountPage({route}: AccountProps) {
  const {uid} = route.params

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