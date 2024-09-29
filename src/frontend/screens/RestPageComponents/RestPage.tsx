import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
//import React from 'react'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To get the restaurantID from the URL
import axios from 'axios';

// Components
import CoreBanner from '../CoreComponents/CoreBanner.tsx';

// navigation
import { useLocation } from 'react-router-dom';
/*
export default function RestPage() {
  const location = useLocation();
  const {rid, rName, color, service} = location.state;

  return (
    <SafeAreaView>
      <CoreBanner />
      <View
      style={[styles.account, {backgroundColor: color}]}
      >
        <Text
        style={styles.headingText}
        >
          Service: {service}
        </Text>
        <Text
        style={styles.headingText}
        >
          Restaurant Name: {rName}
        </Text>
        <Text
        style={styles.headingText}
        >
          Restaurant ID: {rid}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  account: {
    //alignItems: 'center',
    height: 110,
  }
})

*/
// Define the Restaurant interface with expected properties
interface Restaurant {
  restaurantName: string;
  restaurantID: string;
  restaurantAddress: string;
  distance: number;
  color?: string;
  uberEatsAvailable: boolean;
  doordashAvailable: boolean;
  grubhubAvailable: boolean;
}

export default function RestPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/restaurants/${id}`)
      .then(response => {
        setRestaurant(response.data);
      })
      .catch(error => {
        console.error('Error fetching restaurant details:', error);
      });
  }, [id]);

  if (!restaurant) {
    return <Text>Loading...</Text>;
  }

  const { restaurantName, restaurantID, restaurantAddress, distance, uberEatsAvailable, doordashAvailable, grubhubAvailable } = restaurant;

  return (
    <SafeAreaView style={styles.container}>
      <CoreBanner setSearchResults={() => {}} />  {/* Search bar stays full width */}
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: '#ff5555' }]}>
          <View style={styles.cardDetails}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            <Text style={styles.details}>Restaurant ID: {restaurantID}</Text>
            <Text style={styles.details}>Distance: {distance} miles</Text>
            <Text style={styles.details}>Address: {restaurantAddress}</Text>
          </View>
          <View style={styles.deliveryOptions}>
            {uberEatsAvailable && (
              <TouchableOpacity style={styles.deliveryButton}>
                <Text style={styles.buttonText}>UberEats</Text>
              </TouchableOpacity>
            )}
            {doordashAvailable && (
              <TouchableOpacity style={styles.deliveryButton}>
                <Text style={styles.buttonText}>DoorDash</Text>
              </TouchableOpacity>
            )}
            {grubhubAvailable && (
              <TouchableOpacity style={styles.deliveryButton}>
                <Text style={styles.buttonText}>GrubHub</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: '50%',  // Card is restricted to 50% width
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginTop: 20,
  },
  cardDetails: {
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    color: '#fff',
  },
  deliveryOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  deliveryButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});