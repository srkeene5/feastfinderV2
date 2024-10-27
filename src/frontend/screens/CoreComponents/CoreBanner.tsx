import { Image, Pressable, StyleSheet, TouchableOpacity, View, Modal, Button, Text } from 'react-native';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ffColors } from './CoreStyles.tsx';
import CoreDrawer from './CoreDrawer.tsx';

interface Props {
    searchVal?: string;
}

const CoreBanner: React.FC<Props> = ({ searchVal }) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchTerm] = useState(searchVal);
    const [deliveryService, setDeliveryService] = useState(''); // State for delivery service
    const [cuisine, setCuisine] = useState(''); // State for cuisine filter
    const [isFilterPopupVisible, setFilterPopupVisible] = useState(false); // State to control popup visibility

    const navigate = useNavigate();
    const location = useLocation();

    function navigationHandler() {
        if (location.pathname !== '/Home' && location.pathname !== '/') {
            navigate('/Home');
        }
    }

    // Send search query and filters to the backend
    const keyHandler = async (event) => {
        if (event.key === 'Enter' && searchValue !== '') {
            console.log(`Searching for: ${searchValue} with service: ${deliveryService} and cuisine: ${cuisine}`);

            try {
                const response = await fetch(`http://localhost:5001/api/searchRestaurant?name=${searchValue}&service=${deliveryService}&cuisine=${cuisine}`);
                
                if (response.ok) {
                    const restaurants = await response.json();
                    console.log('Restaurants Found:', restaurants);
                    navigate('/Search', { state: { search: searchValue, restaurants, deliveryService, cuisine } });
                } else {
                    console.log('No restaurants found');
                    navigate('/Search', { state: { search: searchValue, restaurants: undefined, deliveryService, cuisine, errorText: 'No restaurants found' } });
                }
            } catch (error) {
                console.error('Error fetching restaurant:', error);
                navigate('/Search', { state: { search: searchValue, restaurants: undefined, deliveryService, cuisine, errorText: 'Error fetching restaurant' } });
            }
        }
    };

    const inputHandler = (event) => {
        setSearchTerm(event.target.value);
    };

    // Open or close the filter popup
    const toggleFilterPopup = () => {
        setFilterPopupVisible(!isFilterPopupVisible);
    };

    // Handle form submission for filtering
    const applyFilters = () => {
        setFilterPopupVisible(false);
        console.log('Filters applied:', { deliveryService, cuisine });
        // You could trigger a search here based on filters.
    };

    return (
        <View style={styles.pageContainer}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Pressable style={styles.cardImageHolder} onPress={navigationHandler}>
                        <Image source={require('../images/FeastFinder-solid-circle.png')} style={styles.cardImage} />
                    </Pressable>
                    <input
                        type="text"
                        style={styles.search}
                        onChange={inputHandler}
                        value={searchValue}
                        placeholder="Search..."
                        onKeyDown={keyHandler}
                    />
                    {/* Filter Button to open the popup */}
                    <TouchableOpacity style={styles.filterButton} onPress={toggleFilterPopup}>
                        <Text style={styles.filterButtonText}>Filter</Text>
                    </TouchableOpacity>
                    <CoreDrawer open={open} setOpen={setOpen} />
                </View>

                {/* Other Components of the page go here */}
                {/* They will all be blurred when isFilterPopupVisible is true */}
            </View>

            {/* Modal for filter options */}
            <Modal visible={isFilterPopupVisible} animationType="slide" transparent={true}>
                <View style={styles.popupOverlay}>
                    <View style={styles.popupContainer}>
                        <Text style={styles.popupTitle}>Filter Options</Text>

                        {/* Delivery Service Filter */}
                        <Text style={styles.popupLabel}>Delivery Service:</Text>
                        <select style={styles.dropdown} onChange={(e) => setDeliveryService(e.target.value)} value={deliveryService}>
                            <option value="">Any</option>
                            <option value="UberEats">UberEats</option>
                            <option value="Grubhub">Grubhub</option>
                            <option value="DoorDash">DoorDash</option>
                        </select>

                        {/* Cuisine Filter */}
                        <Text style={styles.popupLabel}>Cuisine:</Text>
                        <select style={styles.dropdown} onChange={(e) => setCuisine(e.target.value)} value={cuisine}>
                            <option value="">Any</option>
                            <option value="Italian">Italian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Indian">Indian</option>
                            <option value="Japanese">Japanese</option>
                        </select>

                        {/* Apply and Close Buttons */}
                        <View style={styles.popupButtonContainer}>
                            <Button title="Apply Filters" onPress={applyFilters} />
                            <Button title="Close" color="red" onPress={toggleFilterPopup} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CoreBanner;

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
    },
    container: {
        width: '100%',
        height: '100%',
    },
    search: {
        height: 60,
        margin: 20,
        marginRight: 25,
        borderWidth: 1,
        flexGrow: 1,
        borderRadius: 20,
        padding: 10,
    },
    filterButton: {
        backgroundColor: ffColors.ffGreenL,
        height: 60,
        margin: 20,
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        width: '100%',
        backgroundColor: ffColors.ffGreenD,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardImageHolder: {
        height: 90,
        width: 120,
        margin: 5,
        borderRadius: 45,
    },
    cardImage: {
        height: 90,
        width: 120,
    },
    popupOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkened background
    },
    popupContainer: {
        width: '80%',
        backgroundColor: '#f5f5f5', // Light grey background to contrast the dark overlay
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    popupTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    popupLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dropdown: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#ffffff',
    },
    popupButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
