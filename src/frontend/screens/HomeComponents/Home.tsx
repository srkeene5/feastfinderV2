import React from "react";

import {
  SafeAreaView,
  ScrollView,
} from "react-native";

// Components
import PopularCards from "./PopularCards.tsx";
import BannerCard from "./BannerCard.tsx";

// navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App.tsx";

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function Home({navigation}: HomeProps) {

  return(
    <SafeAreaView>
      <ScrollView>
        <BannerCard />
        <PopularCards />
      </ScrollView>
    </SafeAreaView>
  )
}