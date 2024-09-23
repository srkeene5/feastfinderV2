import React from "react";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Button
} from "react-native";

// Components
import PopularCards from "./PopularCards";
import BannerCard from "./BannerCard";

// navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function Home({navigation}: HomeProps) {
  const isDarkMode = useColorScheme() === 'dark'

  return(
    <SafeAreaView>
      <ScrollView>
        <BannerCard />
        <PopularCards />
      </ScrollView>
    </SafeAreaView>
  )
}

const elStyles = StyleSheet.create({
  core: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#555555'
  },
  bannerMLight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#0598ce'
  },
  pageMLight: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff'
  }
})