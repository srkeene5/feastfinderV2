import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// Components
import SearchCards from "./SearchCards.tsx";
import CoreBanner from "../CoreComponents/CoreBanner.tsx";
import { useLocation } from "react-router-dom";
import MapComponent from "../MapComponents/MapComponent.tsx";
import CoreStyles from "../CoreComponents/CoreStyles.tsx";
import tw from 'twrnc';

export default function SearchPage() {
  const location = useLocation();
  const { search, results } = location.state;
  const { scrollableStyle } = CoreStyles();
  const styles = CoreStyles().searchPageStyles;

  return (
    <View style={tw.style(styles.container)}>
      <CoreBanner searchVal={search} />
      <View style={tw.style(styles.searchPageContainer)}>
        <View style={styles.mapContainer}>
          <MapComponent restaurants={results} />
        </View>
        <View style={tw.style(styles.cardsContainer)}>
          <div style={scrollableStyle}>
            <SearchCards />
          </div>
        </View>
      </View>
    </View>
  );
}