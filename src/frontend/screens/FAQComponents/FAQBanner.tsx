import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Link to="/settings" style={styles.button}> {/* This links to the SettingsNav */}
        <Image
          source={require('../images/FeastFinder-solid-circle.png')} // Ensure the image path is correct
          style={styles.logo}
        />
      </Link>
      <Text style={styles.title}>FeastFinder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    backgroundColor: '#555555', // Dark background for the banner
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    flex: 1,
  },
  logo: {
    width: 100, // Adjust size as needed
    height: 75, // Adjust size as needed
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    color: '#fff', // White text for contrast
    fontWeight: 'bold',
  },
});

export default Banner;
