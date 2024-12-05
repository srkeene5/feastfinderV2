// src/frontend/screens/HomeComponents/Home.tsx

import React from "react";

// Remove React Native imports
// import { SafeAreaView } from "react-native";

// Authentication
import { useAuth } from '../UserComponents/Authorizer.tsx';
import useRequireAuth from "../UserComponents/RequireAuth.tsx"

// Components
import PopularCards from "./PopularCards.tsx";
import CoreBanner from "../CoreComponents/CoreBanner.tsx";
import MapComponent from "../MapComponents/MapComponent.tsx"; // Adjust the path as necessary
import { ffColors } from '../CoreComponents/CoreStyles.tsx';
import DishRecommendations from "./DishRecommendations.tsx";
import NotificationFooter from "../HomeComponents/NotificationFooter.tsx";

export default function Home() {
  const { loading } = useAuth();
  useRequireAuth();

  if (loading) {
    return <div> Loading... </div>
  }

  return (
    <div
      style={{
        backgroundColor: ffColors.ffBackground,
        minHeight: '100vh',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CoreBanner />
      <div style={{ flex: 1 }}>
        <PopularCards 
          fetchType={'popularRestaurants'}
        />
        <PopularCards
          fetchType={'cartroute/recent-restaurants'}
        />
        <PopularCards
          fetchType={'cartroute/recent-dishes'}
        />
        <DishRecommendations />
      </div>
      <NotificationFooter />
    </div>
  );
}
