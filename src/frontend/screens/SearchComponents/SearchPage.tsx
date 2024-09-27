import React from "react";

import {
  SafeAreaView,
  ScrollView,
} from "react-native";

// Components
import SearchCards from "./SearchCards.tsx";
import CoreBanner from "../CoreComponents/CoreBanner.tsx";

export default function SearchPage() {

  return(
    <SafeAreaView>
      <ScrollView>
        <CoreBanner />
        <SearchCards />
      </ScrollView>
    </SafeAreaView>
  )
}