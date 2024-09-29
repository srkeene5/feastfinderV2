//import React from 'react'
import React, { useEffect, useState } from 'react';
// navigation
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // To fetch data from the backend


import { 
    SafeAreaView,
    ScrollView, 
    StyleSheet,
    Text,
    TouchableOpacity, 
} from 'react-native'


/*
export default function PopularCards() {
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

    const navigate = useNavigate();
    const location = useLocation();

    function handlePop(rid: number, name: string, color: string){
        //TODO: ajax searchValue to backend
        //TODO: Recieve Search Result
        navigate('/Search', {state: {search: name, restaurants: restaurants}})
    }

    const restItem = (item: { rid: number; name: string; color: string; }) => {
        return (
            <TouchableOpacity
            key={item.rid}
            style={[styles.card, {backgroundColor: item.color}]}
            //navigate('/settingsNavigation', {state: {uid: 86}})
            onPress={() => {handlePop(item.rid, item.name, item.color)}}
            >
                <Text>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
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
                {restaurants.map((item) => {
                    return restItem(item);
                })}
            </ScrollView>
        </SafeAreaView>
    )
}
*/

// Define the type for your restaurant objects
interface Restaurant {
    restaurantID: string;
    restaurantName: string;
    color?: string;  // Color is optional
}

export default function PopularCards({ restaurants = [] }: { restaurants: Restaurant[] }) {
    const [fetchedRestaurants, setFetchedRestaurants] = useState<Restaurant[]>([]);  // Use Restaurant type for state

    const navigate = useNavigate();

    // Fetch the restaurant data from the backend when the component is mounted
    useEffect(() => {
        if (restaurants.length === 0) {
            axios.get('http://localhost:5001/api/popularRestaurants')  // Ensure your backend route is correct
                .then(response => {
                    setFetchedRestaurants(response.data);
                })
                .catch(error => {
                    console.error('Error fetching popular restaurants:', error);
                });
        } else {
            setFetchedRestaurants(restaurants);  // Use passed restaurants if available (like from search results)
        }
    }, [restaurants]);

    // Function to handle when a restaurant card is clicked
    function handlePop(restaurantID: string) {
        navigate(`/restaurant/${restaurantID}`);  // Navigate to the restaurant details page
    }

    // Render each restaurant item as a card
    const restItem = (item: Restaurant) => {
        return (
            <TouchableOpacity
                key={item.restaurantID}
                style={[styles.card, { backgroundColor: item.color || '#ddd' }]}  // Use the color if available or default
                onPress={() => { handlePop(item.restaurantID) }}  // Navigate to restaurant details
            >
                <Text>{item.restaurantName}</Text>
            </TouchableOpacity>
        );
    }

    // Render the popular cards
    return (
        <SafeAreaView>
            <Text style={styles.headingText}>Popular:</Text>
            <ScrollView style={styles.container} horizontal={true}>
                {fetchedRestaurants.map((item) => restItem(item))}
            </ScrollView>
        </SafeAreaView>
    );
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
        width: 100,
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
    },
})