import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import React from 'react';
import CoreBanner from '../CoreComponents/CoreBanner.tsx';

export default function ProfileManagement() {
  const [currentAddress, setCurrentAddress] = React.useState('123 Main St, Springfield'); // Example current address
  const [newAddress, setNewAddress] = React.useState('');

  // Dietary preferences as checkboxes
  const [dietaryPreferences, setDietaryPreferences] = React.useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
  });

  const handleCheckboxChange = (preference) => {
    setDietaryPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preference]: !prevPreferences[preference],
    }));
  };

  const handleSave = () => {
    console.log('New Address:', newAddress);
    console.log('Dietary Preferences:', dietaryPreferences);
    // Logic to save the updated information
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* CoreBanner component */}
      <CoreBanner style={styles.banner} />

      <View style={styles.profileForm}>
        <Text style={styles.headingText}>Profile Management</Text>

        {/* Current Address Display */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Address:</Text>
          <Text style={styles.currentAddressText}>{currentAddress}</Text>
        </View>

        {/* New Address Input Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your new address"
            value={newAddress}
            onChangeText={setNewAddress}
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

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  currentAddressText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'column',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#dd3333',
    width: 150,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
