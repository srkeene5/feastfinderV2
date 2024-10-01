import axios from 'axios';
import React, { useEffect } from 'react'

import { 
    SafeAreaView,
    ScrollView, 
    StyleSheet,
    Text,
    TouchableOpacity, 
} from 'react-native'

// navigation
import { useNavigate } from 'react-router-dom';

// Define the type for your restaurant objects
interface Restaurant {
    restaurantID: string,
    restaurantName: string,
    restaurantAddress: string,
    distance: Number,
    menu: string[],
    ubereatsMenuPrice: Number[],
    doordashMenuPrice: Number[],
    grubhubMenuPrice: Number[],
    uberEatsAvailable: boolean,
    doordashAvailable: boolean,
    grubhubAvailable: boolean
}

export default function PopularCards() {
    const [fetchedRestaurants, setFetchedRestaurants] = React.useState<Restaurant[]>([]);

    const navigate = useNavigate();
    
    // Fetch the restaurant data from the backend when the component is mounted
    useEffect(() => {
        axios.get('http://localhost:5001/api/popularRestaurants')  // Ensure your backend route is correct
                .then(response => {
                    setFetchedRestaurants(response.data);
                })
                .catch(error => {
                    console.error('Error fetching popular restaurants:', error);
                });
    }, []);

    const handlePop = async (name: string) => {
        console.log("Searching for: " + name);
        try {
            // Send the request to your backend API
            const response = await fetch('http://localhost:5001/api/searchRestaurant?name=' + name);
                
            // Check if the response is OK and parse JSON
            if (response.ok) {
                const restaurants = await response.json();
                // Log the entire restaurant object(s)
                console.log('Restaurants Found:', restaurants);
                navigate('/Search', {state: {search: name, restaurants: restaurants, errorText: ''}})
            } else {
                console.log('No restaurants found');
                navigate('/Search', {state: {search: name, restaurants: undefined, errorText: 'No restaurants found'}})
            }
        } catch (error) {
            console.error('Error fetching restaurant:', error);
            navigate('/Search', {state: {search: name, restaurants: undefined, errorText: 'Error fetching restaurant:'}})
        }
    }

    const restItem = (item: string) => {
        return (
            <TouchableOpacity
            style={styles.card}
            onPress={() => {handlePop(item)}}
            >
                <Text>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }

    const restItems = (restaurants: Restaurant[]) => {
        var restName = new Set();
        restaurants.forEach(restaurant => {
            restName.add(restaurant.restaurantName)
        });
        return Array.from(restName).map((item: string) => restItem(item))
    }

    //-----Popular Cards Exported-----
    return (
        <SafeAreaView>
            <Text 
            style={styles.headingText}
            >
                Popular:
            </Text>
            <ScrollView
            style={styles.container}
            horizontal={true}
            >
                {restItems(fetchedRestaurants)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    container: {
        width: '100%',
        marginEnd: 10,
        marginBottom: 40
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        padding: 10,
        minWidth: 100,
        height: 100,
        borderRadius: 10,
        margin: 8,
        elevation: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#333',
        shadowOpacity: .5,
        shadowRadius: 2,
        backgroundColor: '#dddddd',
    },
})