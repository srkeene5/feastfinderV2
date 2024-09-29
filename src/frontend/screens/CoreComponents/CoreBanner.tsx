import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CoreBanner() {
    
    const [searchValue, setSearchTerm] = React.useState('')

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
                    navigate('/Search', {state: {search: searchValue, restaurants: restaurants, errorText: ''}})
                } else {
                    console.log('No restaurants found');
                    navigate('/Search', {state: {search: searchValue, restaurants: undefined, errorText: 'No restaurants found'}})

                }
            } catch (error) {
                console.error('Error fetching restaurant:', error);
                navigate('/Search', {state: {search: searchValue, restaurants: undefined, errorText: 'Error fetching restaurant:'}})
            }

            // Clear the search input
            setSearchTerm('');
        }
    };

    const inputHandler = (event) => {
        setSearchTerm(event.target.value);
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
        flexGrow: 1,
        borderRadius: 20,
        padding: 10,
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
        margin: 5,
        borderRadius: 45,   
        //backgroundColor: 'white'
    },
    cardImage: {
        //ratio MUST be 3:4
        height: 90,
        width: 120,
    }
})