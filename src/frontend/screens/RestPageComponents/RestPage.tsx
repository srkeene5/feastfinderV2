import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

// Components
import CoreBanner from '../CoreComponents/CoreBanner.tsx';
import { coreStyles } from '../CoreComponents/CoreStyles.tsx';


// navigation
import { useLocation } from 'react-router-dom';

const MenuItem = ({ item, price }) => {
  return (
    <li className="flex justify-between items-center p-4 border-b border-gray-200 space-x-8">
      <span className="text-lg font-medium text-gray-800">{item}</span>
      <span className="text-lg font-semibold text-green-600">${price.toFixed(2)}</span>
    </li>
  );
};


export default function RestPage() {
  const location = useLocation();
  const {restaurant, service} = location.state;

  
    let prices = [1, 2 , 3];

    switch (service) {
      case "DoorDash":
        prices = restaurant.doordashMenuPrice
        break;
      case "UberEats":
        prices = restaurant.ubereatsMenuPrice
        break;
      case "GrubHub":
        prices = restaurant.grubhubMenuPrice
        break;
      default:
        console.log("Invalid service or service's prices not available")
    }
  
    
  

  return (
    <SafeAreaView>
      <CoreBanner />
      <View
      style={[styles.account]}
      >
        <Text
        style={coreStyles.headingText}
        >
          Service: {service}
        </Text>
        <Text
        style={coreStyles.headingText}
        >
          Restaurant Name: {restaurant.restaurantName}
        </Text>
        <Text
        style={coreStyles.headingText}
        >
          Restaurant ID: {restaurant.restaurantID}
        </Text>

        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{restaurant.restaurantName} Menu</h1>
        <ul className="divide-y divide-gray-200">
          {restaurant.menu.map((item, index) => (
            <MenuItem key={index} item={item} price={prices[index]} />
          ))}
        </ul>
      </div>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  account: {
    //alignItems: 'center',
    height: 110,
  }
})