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

export default function Home() {

  const {loading} = useAuth()
  useRequireAuth();
  if (loading) {
    return <div> Loading... </div>
  }
  return(
    <SafeAreaView>
      <CoreBanner />
      <PopularCards />
      <MapComponent />
    </SafeAreaView>
  )
}