import React, { useEffect } from 'react'

import { 
    SafeAreaView,
    Text,
    View,
    Image,
    Pressable, 
} from 'react-native'
import tw from 'twrnc';
import { API_BASE_URL } from '../../../config.js';

import CoreStyles from '../CoreComponents/CoreStyles.tsx';

// navigation
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../UserComponents/Authorizer.tsx';

interface GenItem {
    ID: string,
    name: string,
    searchName: string,
    description: string,
    image: string // Update the type to string for compatibility with Image source
}

export default function PopularCards({fetchType}) {
    const [title, setTitle] = React.useState('error: Failed to Fetch')
    const [fetchedData, setFetchedData] = React.useState<any[]>([]);
    const {user} = useAuth();
    const { coreForm, coreStyles, scrollableStyleX } = CoreStyles();
    const styles = CoreStyles().popularCardsStyles

    const navigate = useNavigate();
    
    // Fetch the restaurant data from the backend when the component is mounted
    useEffect(() => {
        const restReq = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/${fetchType}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`
                    },
                })
                const data = await response.json();
                //setFetchedData(data);
                if (fetchType === 'popularRestaurants') {
                    const cartsResponse = await fetch(`${API_BASE_URL}/api/cartroute/carts/all`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    const cartsData = await cartsResponse.json();
    
                    // Extract restaurant names (chain names) from the carts
                    const cartChainNames = cartsData.carts.map((cart: any) => cart.restaurant.restaurantName);
    
                    // Consolidate order counts by chain name
                    const chainOrderCounts = cartChainNames.reduce((acc: Record<string, number>, chainName: string) => {
                        acc[chainName] = (acc[chainName] || 0) + 1;
                        return acc;
                    }, {});
    
                    // Log the consolidated order counts for debugging
                    console.log('Chain order counts:', chainOrderCounts);
    
                    // Sort the popular restaurants based on consolidated order counts
                    data.sort((a: any, b: any) => {
                        const aCount = chainOrderCounts[a.restaurantName] || 0;
                        const bCount = chainOrderCounts[b.restaurantName] || 0;
                        // Sort by order count, descending
                        return bCount - aCount;
                    });
    
                    setFetchedData(data);
                    setTitle('Popular Near You:');
                } else if (fetchType === 'cartroute/recent-restaurants') {
                    setFetchedData(data)
                    setTitle('Recent Restaurants:');
                } else if (fetchType === 'cartroute/recent-dishes') {
                    setFetchedData(data)
                    setTitle('Recent Dishes:');
                } else if (fetchType.includes('searchDish')){
                    setFetchedData(data)
                    setTitle('Recommended for You:');
                } else {
                    setFetchedData(data)
                    setTitle('Fetch Type Untitled');
                }
            } catch(error) {
                console.error(`Error fetching ${fetchType}:`, error);
                setTitle('error: Failed to Fetch');
            }
        }
        restReq();
        
    }, [fetchType]);

    const handlePop = async (name: string) => {
        console.log("Searching for: " + name);
        try {
            // Send the request to your backend API
            const response = await fetch(`${API_BASE_URL}/api/searchRestaurant?name=` + encodeURIComponent(name));
                
            // Check if the response is OK and parse JSON
            if (response.ok) {
                const results = await response.json();
                // Log the entire restaurant object(s)
                console.log('Restaurants Found:', results);
                navigate('/Search', {
                    state: {
                        search: name,
                        results: results,
                        searchType: 'restaurant',
                        deliveryService: '', // Adjust if needed
                        errorText: ''
                    }
                });
            } else {
                console.log('No restaurants found');
                navigate('/Search', {
                    state: {
                        search: name,
                        results: [],
                        searchType: 'restaurant',
                        deliveryService: '', // Adjust if needed
                        errorText: 'No restaurants found'
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching restaurant:', error);
            navigate('/Search', {
                state: {
                    search: name,
                    results: [],
                    searchType: 'restaurant',
                    deliveryService: '', // Adjust if needed
                    errorText: 'Error fetching restaurant'
                }
            });
        }
    }

    const restDishItem = (item: GenItem) => {
        const truncatedDescription = item.description.length > 20
            ? item.description.substring(0, 20) + '...'
            : item.description;

        return (
            <Pressable
                key={item.ID}
                style={styles.container}
                onPress={() => {handlePop(item.searchName)}}
            >            
                <View style={styles.card}>
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
                            {truncatedDescription}
                        </Text>
                    </View>
                </View>
            </Pressable>
        )
    }

    const restDishItems = (items: any[]) => {
        const itemSub: GenItem[] = [];  // Explicitly declare the type here
        if (items && items.length > 0) {
            if (items[0].dishName) {
                const dishNameSet = new Set();
                items.forEach(dish => {
                    console.log("dishRestName: " + dish.restaurantName)
                    if (!dishNameSet.has(dish.dishName)) {
                        dishNameSet.add(dish.dishName);
                        itemSub.push({
                            ID: dish.dishName,
                            name: dish.dishName,
                            searchName: dish.restaurantName || (Array.isArray(dish.restaurantNames) && dish.restaurantNames[0]) || undefined,
                            description: dish.dishName + ' Description',
                            image: dish.dishImage || dish.image || require('../images/testDish.png') // Adjust image as needed
                        });
                    }
                });
            } else if (items[0].restaurantName) {
                const restNameSet = new Set();
                items.forEach(restaurant => {
                    if (!restNameSet.has(restaurant.restaurantName)) {
                        restNameSet.add(restaurant.restaurantName);
                        itemSub.push({
                            ID: restaurant.restaurantID,
                            name: restaurant.restaurantName,
                            searchName: restaurant.restaurantName,
                            description: restaurant.restaurantName + ' Description',
                            image: restaurant.restaurantImage || '/images/testRest.png'
                        });
                    }
                });
            }
            return itemSub.map((item) => restDishItem(item));
        } else {
            var errorText = fetchType === 'popularRestaurants' ? 'No Restaurants Found' : 'No Recent History Found'
            return (
                <div style={{marginLeft: 32}}>
                    <p style={coreForm.subheader}>{errorText}</p>
                </div>
            ) 
        }
    }
    
    //-----Popular Cards Exported-----
    return (
        <SafeAreaView style={{paddingBottom: 16}}>
            <Text 
                style={coreStyles.headingText}
            >
                {title}
            </Text>
            <div
                style={{...scrollableStyleX , ...styles.scrollCards}}
            >
                {restDishItems(fetchedData)}
            </div>
            
        </SafeAreaView>
    )
}
