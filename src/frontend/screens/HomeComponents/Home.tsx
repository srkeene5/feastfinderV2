/*
import React from "react";

import {
  SafeAreaView,
  ScrollView,
} from "react-native";

// Components
import PopularCards from "./PopularCards.tsx";
import CoreBanner from "../CoreComponents/CoreBanner.tsx";

export default function Home() {

  return(
    <SafeAreaView>
      <ScrollView>
        <CoreBanner />
        <PopularCards />
      </ScrollView>
    </SafeAreaView>
  )
}

*/

import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

// Components
import PopularCards from "./PopularCards.tsx";
import CoreBanner from "../CoreComponents/CoreBanner.tsx";

// Props for Home component
interface HomeProps {
  setSearchResults: (results: any) => void;  // Function to handle search results
  restaurants: any[];  // The list of restaurants (either search results or popular restaurants)
}

export default function Home({ setSearchResults, restaurants }: HomeProps) {
  return (
    <SafeAreaView>
      <ScrollView>
        {/* Pass setSearchResults to CoreBanner */}
        <CoreBanner setSearchResults={setSearchResults} />
        {/* Pass restaurants to PopularCards */}
        <PopularCards restaurants={restaurants} />
      </ScrollView>
    </SafeAreaView>
  );
}