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
import CoreStyles from '../CoreComponents/CoreStyles.tsx';
import DishRecommendations from "./DishRecommendations.tsx";

export default function Home() {

  const { loading } = useAuth();
  const { ffColors } = CoreStyles();
  useRequireAuth();

  if (loading) {
    return <div> Loading... </div>
  }

  const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));

  return (
    <div
      style={{
        backgroundColor: ffColors.ffBackground,
        minHeight: '100vh',
        height: 'auto'
      }}
    >
      <CoreBanner />
      <PopularCards 
        fetchType={'popularRestaurants'}
      />
      <PopularCards
        fetchType={'cartroute/recent-restaurants'}
      />
      <PopularCards
        fetchType={'cartroute/recent-dishes'}
      />
      <PopularCards
        fetchType={`searchDish?name=${randomLetter}`}
      />
      {/*<DishRecommendations />*/}
      
    </div>
  )
}
