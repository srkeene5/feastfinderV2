import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import React, { useEffect } from 'react';
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';
import { useAuth } from '../../UserComponents/Authorizer.tsx';
import AccountLinkedAPIs from './AccountLinkedAPIs.tsx';

export default function Account() {
  const { user } = useAuth();
  const [currentAddress, setCurrentAddress] = React.useState(''); // This will be fetched from the backend
  const [newAddress, setNewAddress] = React.useState('');
  const [dietaryPreferences, setDietaryPreferences] = React.useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  // Fetch the current address and dietary preferences from backend on component load
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const addressResponse = await fetch('http://localhost:5001/api/address/recent', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token, // Add auth token
          },
        });
        const addressData = await addressResponse.json();
        setCurrentAddress(`${addressData.street}, ${addressData.city}, ${addressData.state}, ${addressData.postalCode}, ${addressData.country}`);

        const preferencesResponse = await fetch('http://localhost:5001/api/preferences', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
          },
        });
        const preferencesData = await preferencesResponse.json();
        setDietaryPreferences({
          vegetarian: preferencesData.includes('vegetarian'),
          vegan: preferencesData.includes('vegan'),
          glutenFree: preferencesData.includes('glutenFree'),
          dairyFree: preferencesData.includes('dairyFree'),
          nutFree: preferencesData.includes('nutFree'),
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  // Address format validation
  const isValidAddressFormat = (address) => {
    const addressParts = address.split(',').map(part => part.trim());
    return addressParts.length === 5; // Ensure there are exactly 5 parts
  };

  // Handle address save
  const handleSaveAddress = async () => {
    // Check if the new address format is valid
    if (!isValidAddressFormat(newAddress)) {
      setErrorMessage('Please enter a valid address format: street, city, state, postal code, country.');
      return; // Stop further execution if invalid
    }

    // Clear the error message if the address is valid
    setErrorMessage('');

    try {
      const address = newAddress.split(','); // Split address into components
      const response = await fetch('http://localhost:5001/api/address', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
        body: JSON.stringify({
          street: address[0],
          city: address[1],
          state: address[2],
          postalCode: address[3],
          country: address[4],
        }),
      });

      if (response.ok) {
        setCurrentAddress(newAddress); // Update the displayed current address only after successful submission
        setNewAddress(''); // Clear new address input
      } else {
        setErrorMessage('Failed to update the address.'); // Set error message
      }
    } catch (error) {
      console.error('Error updating address:', error);
      setErrorMessage('An error occurred while updating the address.');
    }
  };

  // Handle dietary preferences save
  const handleSavePreferences = async () => {
    const selectedPreferences = Object.keys(dietaryPreferences).filter(key => dietaryPreferences[key]);

    try {
      const response = await fetch('http://localhost:5001/api/preferences/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
        body: JSON.stringify({
          preferences: selectedPreferences,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Dietary preferences updated successfully.');
      } else {
        setErrorMessage('Failed to update dietary preferences.'); // Set error message
      }
    } catch (error) {
      console.error('Error updating dietary preferences:', error);
      setErrorMessage('An error occurred while updating dietary preferences.');
    }
  };

  // Handle checkbox change for dietary preferences
  const handleCheckboxChange = (preference) => {
    setDietaryPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preference]: !prevPreferences[preference],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <CoreBanner style={styles.banner} />

      <View style={styles.profileForm}>
        <Text style={styles.headingText}>Account Management</Text>

        {/* Error Message Display */}
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        {/* Current Address Display */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Address:</Text>
          <Text style={styles.currentAddressText}>{currentAddress || 'Loading...'}</Text>
        </View>

        {/* New Address Input Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your new address"
            value={newAddress}
            onChangeText={(text) => setNewAddress(text)} // Only update newAddress state
          />
        </View>

        {/* Dietary Preferences Checkboxes */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Dietary Preferences:</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxItem}>
              <CheckBox
                value={dietaryPreferences.vegetarian}
                onValueChange={() => handleCheckboxChange('vegetarian')}
              />
              <Text style={styles.checkboxLabel}>Vegetarian</Text>
            </View>

            <View style={styles.checkboxItem}>
              <CheckBox
                value={dietaryPreferences.vegan}
                onValueChange={() => handleCheckboxChange('vegan')}
              />
              <Text style={styles.checkboxLabel}>Vegan</Text>
            </View>

            <View style={styles.checkboxItem}>
              <CheckBox
                value={dietaryPreferences.glutenFree}
                onValueChange={() => handleCheckboxChange('glutenFree')}
              />
              <Text style={styles.checkboxLabel}>Gluten-Free</Text>
            </View>

            <View style={styles.checkboxItem}>
              <CheckBox
                value={dietaryPreferences.dairyFree}
                onValueChange={() => handleCheckboxChange('dairyFree')}
              />
              <Text style={styles.checkboxLabel}>Dairy-Free</Text>
            </View>

            <View style={styles.checkboxItem}>
              <CheckBox
                value={dietaryPreferences.nutFree}
                onValueChange={() => handleCheckboxChange('nutFree')}
              />
              <Text style={styles.checkboxLabel}>Nut-Free</Text>
            </View>
          </View>
        </View>

        {/* Link Accounts */}
        <AccountLinkedAPIs/>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
            <Text style={styles.buttonText}>Save Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences}>
            <Text style={styles.buttonText}>Save Preferences</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  banner: {
    flex: 0,
    width: '100%',
  },
  profileForm: {
    margin: 30,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  currentAddressText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  checkboxLabel: {
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
