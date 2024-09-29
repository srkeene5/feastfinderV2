import React from "react";
import {useEffect} from 'react'


import {
  SafeAreaView,
  ScrollView,
} from "react-native";

//Authentication

import { useAuth } from '../UserComponents/Authorizer.tsx';
import useRequireAuth from "../UserComponents/RequireAuth.tsx"

//Navigation
import { useNavigate } from 'react-router-dom';


// Components
import PopularCards from "./PopularCards.tsx";
import CoreBanner from "../CoreComponents/CoreBanner.tsx";

export default function Home() {

  const {user, loading} = useAuth()
  useRequireAuth();
  if (loading) {
    return <div> Loading... </div>
  }
  return(
    <SafeAreaView>
      <ScrollView>
        <CoreBanner />
        <PopularCards />
      </ScrollView>
    </SafeAreaView>
  )
}