import axios from 'axios';
import React, { useEffect } from 'react'

import { 
    SafeAreaView,
    ScrollView, 
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image, 
} from 'react-native'
import tw from 'twrnc';


import { coreForm, coreStyles, ffColors } from '../CoreComponents/CoreStyles.tsx';

// navigation
import { useNavigate } from 'react-router-dom';

// Define the type for your restaurant objects


interface Dish {
    dishID: string,
    dishName: string,
    dishDescription: string
}

interface GenItem {
    ID: string,
    name: string,
    description: string,
    image: string // Update the type to string for compatibility with Image source
}

export default function PopularCards({fetchType}) {
    const [title, setTitle] = React.useState('error: Failed to Fetch')
    const [fetchedData, setFetchedData] = React.useState<[]>([]);

    const navigate = useNavigate();
    
    // Fetch the restaurant data from the backend when the component is mounted
    useEffect(() => {
        axios.get('http://localhost:5001/api/' + fetchType)  // Ensure your backend route is correct
                .then(response => {
                    setFetchedData(response.data);
                    if (fetchType === 'popularRestaurants') {
                        setTitle('Popular Near You:');
                    } else {
                        setTitle('Fetch Type Untitled');
                    }
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

    const restDishItem = (item: GenItem) => {
        if (item.description.length > 20) {
            item.description = item.description.substring(0,20) + '...';
        }
        return (
            <TouchableOpacity
            key={item.ID}
            style={styles.container}
            onPress={() => {handlePop(item.name)}}
            >            
                <View style={styles.card}>
                    {/* <img 
                    src={item.image} 
                    alt="Image not Found" style={styles.cardImage} 
                    /> */}
                       <Image 
                        source={{ uri: item.image }} // Use the dynamic image source
                        style={styles.cardImage} 
                        resizeMode="contain" // Ensures image fits within the card without being cut off
                    />
                    <Text
                    style={tw.style(coreForm.subheader)}
                    >
                        {item.name}
                    </Text>
                    <View
                    style={tw.style(coreForm.body)}
                    >
                        <Text
                        style={tw.style(coreForm.text)}
                        >
                            {item.description}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const restDishItems = (items) => {
        var itemSub = new Array<GenItem>
        if (items[0] && items[0].restaurantName) {
            var restName = new Set();
            items.forEach(restaurant => {
                if( !restName.has(restaurant.restaurantName) ) {
                    restName.add(restaurant.restaurantName);
                    itemSub.push({ID: restaurant.restaurantID, name: restaurant.restaurantName, description: restaurant.restaurantName + ' Description', image: restaurant.restaurantImage || '/images/testRest.png' })
                    //image: require('../images/testRest.png')
                }
            });
        } else if(items[0] && items[0].dishName) {
            var dishName = new Set();
            items.forEach(dish => {
                if( !dishName.has(dish.dishName) ) {
                    restName.add(dish.dishName);
                    itemSub.push({ID: dish.dishID, name: dish.dishName, description: dish.dishName + ' Description', image: require('../images/testDish.png')})
                }
            });
        }
        return itemSub.map((item) => restDishItem(item))
    }

    //-----Popular Cards Exported-----
    return (
        <SafeAreaView>
            <Text 
            style={coreStyles.headingText}
            >
                {title}
            </Text>
            <ScrollView
            style={styles.scrollCards}
            horizontal={true}
            >
                {restDishItems(fetchedData)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollCards: {
        display: 'flex',
        width: '100%',
        padding: 5
    },
    container: {
        display: 'flex',
        marginStart: 10,
        marginEnd: 10,
    },
    depcard: {
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
    card: {
        backgroundColor: ffColors.ffCard,
        //borderWidth: 1,
        //borderColor: ffColors.ffGreenL,
        borderRadius: 5,
        padding: 20,
        width: 200,
        elevation: 4, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        //alignItems: 'center',
    },
    cardImage: {
        width: '100%',
        height: undefined, // To maintain aspect ratio
        aspectRatio: 1, // Adjust as necessary for the desired aspect ratio
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
})