import React from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

// Components
import SearchCards from "./SearchCards.tsx";
import CoreBanner from "../CoreComponents/CoreBanner.tsx";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const location = useLocation();
  const {search} = location.state;

  return(
    <SafeAreaView>
      <ScrollView>
        <CoreBanner searchVal={search}/>
        <SearchCards />
      </ScrollView>
    </SafeAreaView>
  )
}