import React from "react";

import {
  SafeAreaView,
  ScrollView,
} from "react-native";

//Authentication

import { useAuth } from '../UserComponents/Authorizer.tsx';
import useRequireAuth from "../UserComponents/RequireAuth.tsx"

// Components
import PopularCards from "./PopularCards.tsx";
import CoreBanner from "../CoreComponents/CoreBanner.tsx";
import MapComponent from "../MapComponents/MapComponent.tsx";
import { ffColors } from '../CoreComponents/CoreStyles.tsx';

export default function Home() {

  const {loading} = useAuth()
  useRequireAuth();
  if (loading) {
    return <div> Loading... </div>
  }
  return(
    <SafeAreaView
    style={{backgroundColor: ffColors.ffBackground}}
    >
      <CoreBanner />
      <PopularCards 
      fetchType={'popularRestaurants'}
      />
      {/* 
      * Add new main page selection such as
      * "Popular Near You:", "Recommended Restaurants:",
      * "Dishes You May Like:", etc
      * Fetch using: axios.get('http://localhost:5001/api/' + fetchType)
      * Add new PopularCard fetchType here: 
      */}

      <MapComponent />
    </SafeAreaView>
  )
}