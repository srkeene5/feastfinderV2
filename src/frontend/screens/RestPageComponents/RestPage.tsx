import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'

// Components
import CoreBanner from '../CoreComponents/CoreBanner.tsx';
import { coreStyles, ffColors } from '../CoreComponents/CoreStyles.tsx';

// navigation
import { useLocation } from 'react-router-dom';

const MenuItem = ({ item, price, quantity, onIncrement, onDecrement }) => {
  return (
    <li>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.quantityContainer}>
          <Pressable
          style={[styles.button, quantity > 0 ? styles.buttonSub : styles.buttonDeactive]}
          onPress={onDecrement} 
          disabled={quantity === 0}
          >
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Pressable
          style={[styles.button, styles.buttonAdd]}
          onPress={onIncrement}
          >
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
        <View 
        style={styles.menuItem}
        >
          <span className="text-lg font-medium text-gray-800 m-4">{item}</span>
          <span className="text-lg font-semibold text-green-600">${price.toFixed(2)}</span>
        </View>
      </View>
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
  
  // Button code
  const [quantities, setQuantities] = useState(Array(restaurant.menu.length).fill(0))

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] -=1;
      setQuantities(newQuantities);
    }
  };

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
              <MenuItem 
              key={index} 
              item={item} 
              price={prices[index]}
              quantity={quantities[index]}
              onIncrement={()=>handleIncrement(index)}
              onDecrement={()=>handleDecrement(index)}
              />
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
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 18,
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  buttonAdd: {
    backgroundColor: ffColors.ffGreenL,
  },
  buttonSub: {
    backgroundColor: ffColors.ffRedL,
  },
  buttonDeactive: {
    backgroundColor: ffColors.ffGreyL,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
})