import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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
                } else {
                    console.log('No restaurants found');
                }
            } catch (error) {
                console.error('Error fetching restaurant:', error);
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