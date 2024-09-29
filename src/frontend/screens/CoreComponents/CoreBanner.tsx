import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/*
export default function CoreBanner() {
    const restaurants = [
        {
            rid: 1,
            name: 'rest1-red',
            color: '#ff5555'
        },
        {
            rid: 2,
            name: 'rest2-green',
            color: '#55ff55'
        },
        {
            rid: 3,
            name: 'rest3-blue',
            color: '#5555ff'
        },
        {
            rid: 4,
            name: 'rest4-yellow',
            color: '#ffff55'
        },
        {
            rid: 5,
            name: 'rest5-orange',
            color: '#ff8844'
        },
        {
            rid: 6,
            name: 'rest6-purple',
            color: '#aa44ff'
        },
        {
            rid: 7,
            name: 'rest7-pink',
            color: '#ff44ff'
        },
        {
            rid: 8,
            name: 'rest8-teal',
            color: '#50DBbb'
        },
        {
            rid: 9,
            name: 'rest9-light blue',
            color: '#99ccff'
        },
        {
            rid: 10,
            name: 'rest10-grey',
            color: '#aaaaaa'
        },
        {
            rid: 11,
            name: 'rest11-brown',
            color: '#775500'
        },
        {
            rid: 12,
            name: 'rest12-d green',
            color: '#4f7f4f'
        },
    ];
    
    const [searchValue, setSearchValue] = React.useState('')

    const navigate = useNavigate();
    const location = useLocation();

    function navigationHandler() {
        if(location.pathname === '/Home' || location.pathname === '/') {
            navigate('/SettingsNavigation', {state: {uid: 86}});
        }
        else {
            navigate(-1);
        }
    }


    // Send search query to the backend and log the full restaurant objects
    const keyHandler = async (event) => {
        if (event.key === 'Enter' && searchValue !== '') {
            console.log("Searching for: " + searchValue);

            try {
                // Send the request to your backend API
                const response = await fetch('http://localhost:5001/api/searchRestaurant?name=' + searchValue);
                
                // Check if the response is OK and parse JSON
                if (response.ok) {
                    const restaurants = await response.json();
                    // Log the entire restaurant object(s)
                    console.log('Restaurants Found:', restaurants);
                } else {
                    console.log('No restaurants found');
                }
            } catch (error) {
                console.error('Error fetching restaurant:', error);
            }

            // Clear the search input
            setSearchValue('');
        }
    };

    const inputHandler = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <View>
            <View 
            style={styles.card}
            >
                <TouchableOpacity 
                style={styles.cardImageHolder}
                onPress={navigationHandler}
                >
                    <Image 
                    source={require('../images/FeastFinder-solid-circle.png')}
                    style={styles.cardImage}
                    />
                </TouchableOpacity>
                <input
                type='text'
                style={styles.search}
                onChange={inputHandler}
                value = {searchValue}
                placeholder='Search...'
                onKeyDown={keyHandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    search:{
        height: 60,
        margin: 20,
        marginRight: 25,
        borderWidth: 1,
        flexGrow: 1
    },
    card: {
        //banner covers top
        width: '100%',
        backgroundColor: '#555555',
        flexDirection: 'row'
    },
    cardImageHolder: {
        //ratio MUST be 3:4
        height: 90,
        width: 120,
        margin: 5
    },
    cardImage: {
        //ratio MUST be 3:4
        height: 90,
        width: 120,
    }
})
*/

export default function CoreBanner({ setSearchResults }) {
    const [searchValue, setSearchValue] = React.useState('');

    const navigate = useNavigate();
    const location = useLocation();

    // Handles navigation when clicking on the logo
    function navigationHandler() {
        if (location.pathname === '/Home' || location.pathname === '/') {
            navigate('/SettingsNavigation', { state: { uid: 86 } });
        } else {
            navigate(-1);  // Go back to the previous page
        }
    }

    // Send search query to the backend and pass the restaurant objects to App.tsx
    const keyHandler = async (event) => {
        if (event.key === 'Enter' && searchValue !== '') {
            console.log("Searching for: " + searchValue);

            try {
                // Send the request to your backend API
                const response = await fetch(`http://localhost:5001/api/searchRestaurant?name=${searchValue}`);
                
                // Check if the response is OK and parse JSON
                if (response.ok) {
                    const restaurants = await response.json();
                    console.log('Restaurants Found:', restaurants);
                    // Pass the search results up to the parent component
                    setSearchResults(restaurants);
                } else {
                    console.log('No restaurants found');
                    setSearchResults([]);  // Clear results if no restaurants found
                }
            } catch (error) {
                console.error('Error fetching restaurant:', error);
            }

            // Clear the search input
            setSearchValue('');
        }
    };

    // Handle input changes
    const inputHandler = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <View style={styles.bannerContainer}>
            {/* Logo with navigation handler */}
            <TouchableOpacity style={styles.cardImageHolder} onPress={navigationHandler}>
                <Image 
                    source={require('../images/FeastFinder-solid-circle.png')}
                    style={styles.cardImage} 
                />
            </TouchableOpacity>

            {/* Search input */}
            <input
                type="text"
                style={styles.search}
                onChange={inputHandler}
                value={searchValue}
                placeholder="Search..."
                onKeyDown={keyHandler}  // Trigger search on 'Enter' press
            />
        </View>
    );
}

// Updated styles
const styles = StyleSheet.create({
    bannerContainer: {
        flexDirection: 'row',  // Places logo and search input in a row
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',  // Ensure it spans the full width
        padding: 10,
        backgroundColor: '#555555',
    },
    cardImageHolder: {
        // Logo container
        height: 90,
        width: 120,
        marginRight: 20,  // Space between logo and search bar
    },
    cardImage: {
        height: '100%',
        width: '100%',
    },
    search: {
        flexGrow: 1,  // Makes the search input take up the remaining space
        height: 60,
        paddingLeft: 20,  // Correct way to add left padding
        paddingRight: 20,  // Correct way to add right padding
        borderWidth: 1,
        borderColor: '#ccc',  // Border color
        borderRadius: 10,
        fontSize: 18,  // Text size
    },
});