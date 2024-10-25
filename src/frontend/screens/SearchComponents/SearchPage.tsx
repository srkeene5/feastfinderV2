import React from "react";

import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

// Components
import SearchCards from "./SearchCards.tsx";
import CoreBanner from "../CoreComponents/CoreBanner.tsx";
import { useLocation } from "react-router-dom";
import MapComponent from "../MapComponents/MapComponent.tsx";
import { ffColors } from "../CoreComponents/CoreStyles.tsx";

export default function SearchPage() {
  const location = useLocation();
  const {search} = location.state;

  return(
    <View style={styles.container}>
      <CoreBanner searchVal={search}/>
      <View
      style={styles.searchPageContainer}
      >
        <View
        style={styles.mapContainer}
        >
          <MapComponent />
        </View>
        <View
        style={styles.cardsContainer}
        >
          <ScrollView>
            <SearchCards />
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ffColors.ffBackground,
    height: '100vh',
    flex: 1,
  },
  searchPageContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
  },
  cardsContainer: {
    flex: 1.75,
    maxHeight: '100%'
  },
})