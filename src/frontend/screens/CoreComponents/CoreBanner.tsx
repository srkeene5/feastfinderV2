import { Image, Pressable, TouchableOpacity, View, Modal, Text } from 'react-native';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CoreStyles from './CoreStyles.tsx';
import CoreDrawer from './CoreDrawer.tsx';
import { API_BASE_URL } from '../../../config.js';

interface Props {
    searchVal?: string;
}

const CoreBanner: React.FC<Props> = ({ searchVal }) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchTerm] = useState(searchVal || '');
    const [deliveryService, setDeliveryService] = useState(''); // State for delivery service
    const [cuisine, setCuisine] = useState(''); // State for cuisine filter
    const [searchType, setSearchType] = useState('restaurant'); // Default is "Restaurants"
    const [isFilterPopupVisible, setFilterPopupVisible] = useState(false); // State to control popup visibility
    // Update timeRanges state to use consistent keys
    const [timeRanges, setTimeRanges] = useState({
        breakfast: false,
        brunch: false,
        lunch: false,
        dinner: false,
        allDay: false,
    });
    const styles = CoreStyles().coreBannerStyles

    // Create a mapping from timeRanges keys to actual strings
    const timeRangeMapping = {
        breakfast: 'Breakfast',
        brunch: 'Brunch',
        lunch: 'Lunch',
        dinner: 'Dinner',
        allDay: 'All Day', // Note the space instead of a hyphen
    };

    const navigate = useNavigate();
    const location = useLocation();

    function navigationHandler() {
        if (location.pathname !== '/Home' && location.pathname !== '/') {
            navigate('/Home');
        }
    }


    const keyHandler = async (event) => {
        if (event.key === 'Enter' && searchValue !== '') {
            const selectedTimeRanges = Object.keys(timeRanges).filter((range) => timeRanges[range]).map((range) => timeRangeMapping[range]);;
            console.log(`Searching for: ${searchValue}, Type: ${searchType}, Service: ${deliveryService}, Cuisine: ${cuisine}, and Time Ranges: ${selectedTimeRanges}`);

            try {
                let response;
                let queryParams = `name=${encodeURIComponent(searchValue)}`;

                if (cuisine && cuisine !== 'All Cuisines') {
                    queryParams += `&cuisineType=${encodeURIComponent(cuisine)}`;
                }

                if (deliveryService && deliveryService !== 'All Services') {
                    queryParams += `&deliveryService=${encodeURIComponent(deliveryService)}`;
                }

                if (selectedTimeRanges.length > 0) {
                    queryParams += `&operatingHours=${encodeURIComponent(selectedTimeRanges.join(','))}`;
                }

                if (searchType === 'restaurant') {
                    response = await fetch(`${API_BASE_URL}/api/searchRestaurant?${queryParams}`);
                } else if (searchType === 'dish') {
                    response = await fetch(`${API_BASE_URL}/api/searchDish?name=${encodeURIComponent(searchValue)}`);
                }

                if (response.ok) {
                    const results = await response.json();
                    console.log('Results Found:', results);
                    navigate('/Search', {
                        state: {
                            search: searchValue,
                            results,
                            searchType,
                            deliveryService,
                            cuisine,
                            timeRanges: selectedTimeRanges
                        }
                    });
                } else {
                    console.log('No results found');
                    navigate('/Search', {
                        state: {
                            search: searchValue,
                            results: [],
                            searchType,
                            deliveryService,
                            cuisine,
                            timeRanges: selectedTimeRanges,
                            errorText: 'No results found'
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching results:', error);
                navigate('/Search', {
                    state: {
                        search: searchValue,
                        results: [],
                        searchType,
                        deliveryService,
                        cuisine,
                        timeRanges: selectedTimeRanges,
                        errorText: 'Error fetching results'
                    }
                });
            }
        }
    };


    const inputHandler = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle search type change
    const handleSearchTypeChange = (type) => {
        setSearchType(type);
    };

    // Open or close the filter popup
    const toggleFilterPopup = () => {
        setFilterPopupVisible(!isFilterPopupVisible);
    };

    // Handle checkbox change for time ranges
    const handleTimeRangeChange = (range) => {
        setTimeRanges((prevRanges) => ({
            ...prevRanges,
            [range]: !prevRanges[range],
        }));
    };

    // Handle form submission for filtering
    const applyFilters = () => {
        setFilterPopupVisible(false);
        console.log('Filters applied:', { deliveryService, cuisine, timeRanges });
    };

    return (
        <View style={styles.pageContainer}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Pressable style={styles.cardImageHolder} onPress={navigationHandler}>
                        <Image source={require('../images/FeastFinder-solid-circle.png')} style={styles.cardImage} />
                    </Pressable>

                    <View style={styles.buttonGroup}>
                        {/* Restaurants button */}
                        <TouchableOpacity
                            style={[
                                styles.searchTypeButton,
                                searchType === 'restaurant' ? styles.selectedButton : styles.unselectedButton,
                            ]}
                            onPress={() => handleSearchTypeChange('restaurant')}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    searchType === 'restaurant' ? styles.selectedText : styles.unselectedText,
                                ]}
                            >
                                Restaurants
                            </Text>
                        </TouchableOpacity>

                        {/* Dishes button */}
                        <TouchableOpacity
                            style={[
                                styles.searchTypeButton,
                                searchType === 'dish' ? styles.selectedButton : styles.unselectedButton,
                            ]}
                            onPress={() => handleSearchTypeChange('dish')}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    searchType === 'dish' ? styles.selectedText : styles.unselectedText,
                                ]}
                            >
                                Dishes
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Search input field */}
                    <input
                        type="text"
                        style={styles.searchInput}
                        onChange={inputHandler}
                        value={searchValue}
                        placeholder="Search..."
                        onKeyDown={keyHandler}
                    />

                    {/* Filter Button to open the popup */}
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            searchType === 'dish' && styles.filterButtonDisabled, // Apply disabled styling when dishes are selected
                        ]}
                        onPress={toggleFilterPopup}
                        disabled={searchType === 'dish'} // Disable filter when dish is selected
                    >
                        <Text style={[styles.filterButtonText, searchType === 'dish' && styles.filterButtonTextDisabled]}>Filter</Text>
                    </TouchableOpacity>

                    <View style={styles.drawerContainer}>
                        <CoreDrawer open={open} setOpen={setOpen} />
                    </View>
                </View>
            </View>

            {/* Modal for filter options */}
            <Modal visible={isFilterPopupVisible} animationType="slide" transparent={true}>
                <View style={styles.popupOverlay}>
                    <View style={styles.popupContainer}>
                        <Text style={styles.popupTitle}>Filter Options</Text>

                        {/* Delivery Service Filter */}
                        <Text style={styles.popupLabel}>Delivery Service:</Text>
                        <select style={styles.dropdown} onChange={(e) => setDeliveryService(e.target.value)} value={deliveryService}>
                            <option value="">All Services</option>
                            <option value="UberEats">UberEats</option>
                            <option value="Grubhub">Grubhub</option>
                            <option value="DoorDash">DoorDash</option>
                        </select>

                        {/* Cuisine Filter */}
                        <Text style={styles.popupLabel}>Cuisine:</Text>
                        <select style={styles.dropdown} onChange={(e) => setCuisine(e.target.value)} value={cuisine}>
                            <option value="">All Cuisines</option>
                            <option value="Italian">Italian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Indian">Indian</option>
                            <option value="Japanese">Japanese</option>
                            <option value="American">American</option>
                        </select>

                        {/* Time Ranges Filter */}
                        <Text style={styles.popupLabel}>Operating Hours:</Text>
                        <View style={styles.checkboxContainer}>
                            <View style={styles.checkboxItem}>
                                <input type="checkbox" checked={timeRanges.breakfast} onChange={() => handleTimeRangeChange('breakfast')} />
                                <Text style={styles.checkboxLabel}>Breakfast</Text>
                            </View>
                            <View style={styles.checkboxItem}>
                                <input type="checkbox" checked={timeRanges.brunch} onChange={() => handleTimeRangeChange('brunch')} />
                                <Text style={styles.checkboxLabel}>Brunch</Text>
                            </View>
                            <View style={styles.checkboxItem}>
                                <input type="checkbox" checked={timeRanges.lunch} onChange={() => handleTimeRangeChange('lunch')} />
                                <Text style={styles.checkboxLabel}>Lunch</Text>
                            </View>
                            <View style={styles.checkboxItem}>
                                <input type="checkbox" checked={timeRanges.dinner} onChange={() => handleTimeRangeChange('dinner')} />
                                <Text style={styles.checkboxLabel}>Dinner</Text>
                            </View>
                            <View style={styles.checkboxItem}>
                                <input type="checkbox" checked={timeRanges.allDay} onChange={() => handleTimeRangeChange('allDay')} />
                                <Text style={styles.checkboxLabel}>All Day</Text>
                            </View>
                        </View>

                        {/* Apply and Close Buttons */}
                        <View style={styles.popupButtonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={applyFilters}>
                                <Text style={styles.buttonText}>Apply Filters</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={toggleFilterPopup}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CoreBanner;
