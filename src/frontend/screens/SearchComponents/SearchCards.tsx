import React from 'react'

import { 
    SafeAreaView,
    ScrollView, 
    StyleSheet,
    Text,
    TouchableOpacity, 
    Image,
    View,
} from 'react-native'

// navigation
import { useLocation, useNavigate } from 'react-router-dom';

function APIButton(service: string, available: boolean, item, navigate) {
    if (available) {
        return (
            <TouchableOpacity
            onPress={() => {navigate('/restaurant', {state: {rid: item.restaurantID, rName: item.restaurantName, service: service}})}}
            style={styles.buttons}
            >
                <Text
                style={styles.buttonText}
                >
                    {service}
                </Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <View
            style={styles.buttonDeactive}
            >
                <Text
                style={styles.buttonTextDeactive}
                >
                    {service}
                </Text>
            </View>
        )
    }
}

export default function SearchCards() {

    const navigate = useNavigate();
    const location = useLocation();
    const {search, restaurants = [], deliveryService, errorText} = location.state;

    //api platform selection logic
        // Check the availability of the restaurant based on the delivery service selected by the user
        const filterBySelectedService = (restaurant) => {
            if (deliveryService === 'UberEats') return restaurant.uberEatsAvailable;
            if (deliveryService === 'Grubhub') return restaurant.grubhubAvailable;
            if (deliveryService === 'DoorDash') return restaurant.doordashAvailable;
            return true; // If no specific service is selected, return all restaurants
        };
    
  // Filter restaurants based on the selected delivery service availability
  const filteredRestaurants = restaurants.filter(filterBySelectedService);


  const restItems = () => {
    if (filteredRestaurants.length > 0) {
        return (
            <ScrollView style={styles.container}>
                {filteredRestaurants.map((item) => restItem(item))}
            </ScrollView>
        );
    } else {
        return (
            <View style={styles.errorPage}>
                <Text style={styles.errorMessage}>
                    {errorText || `No restaurants found for ${deliveryService || 'all services'}.`}
                </Text>
            </View>
        );
    }
};


    const restItem = (
        item: { 
            restaurantID: string; 
            restaurantName: string; 
            restaurantAddress: string;
            distance: number; 
            doordashAvailable: boolean; 
            grubhubAvailable: boolean; 
            uberEatsAvailable: boolean;
            menu;
            doordashMenuPrice;
            grubhubMenuPrice;
            ubereatsMenuPrice;
        }
    ) => {
        return (
            <SafeAreaView 
            style={styles.containerNew}
            >
                <View
                key={item.restaurantID}
                style={styles.card}
                >
                    <Image 
                    source={require('../images/—Pngtree—store icon_4835876.png')}
                    style={styles.cardImage}
                    />
                    <View
                    style={styles.cardContent}
                    >
                        <View
                        style={styles.cardText}
                        >
                            <Text
                            style={styles.restaurantName}
                            >
                                {item.restaurantName}
                            </Text>
                            <Text
                            style={styles.cardDetails}
                            >
                                Distance: {item.distance} Miles
                            </Text>
                            <Text 
                            style={styles.cardDetails}
                            >
                                Address: {item.restaurantAddress}
                            </Text>
                        </View>
                        <View
                        style={styles.buttonContent}
                        >
                            {APIButton("DoorDash", item.doordashAvailable, item, navigate)}
                            {APIButton("GrubHub", item.grubhubAvailable, item, navigate)}
                            {APIButton("UberEats", item.uberEatsAvailable, item, navigate)}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            
        )
    }

    //-----Popular Cards Exported-----
    return (
        <SafeAreaView>
            <Text 
            style={styles.headingText}
            >
                Results for:   {search}
            </Text>
            {restItems()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        margin: 10,
    },
    container: {
        width: '100%',
        marginEnd: 10,
        marginBottom: 40
    },
    card: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minWidth: 500,
        width: '70%',
        height: 300,
        paddingBottom: 1,
        paddingRight: 1,
        padding:1,
        borderRadius: 11,
        margin: 8,
        elevation: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#333',
        shadowOpacity: .5,
        shadowRadius: 2,
        backgroundColor: '#888',
        flexDirection: 'row',
        
    },
    cardImage: {
        aspectRatio: 1/1.2,
        height: '100%',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    cardContent: {
        flex: 1,
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
        backgroundColor: '#ff5555'
    },
    cardText: {
        height: '45%',
    },
    restaurantName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    cardDetails: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 6,
    },
    buttons: {
        backgroundColor: '#e74c3c',
        width: 100,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    buttonDeactive: {
        backgroundColor: '#777777',
        width: 100,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonTextDeactive: {
        color: '#444',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContent: {
        height: '55%',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    errorPage: {
        width: '100%',
        paddingTop: 50,
        alignItems: 'center',
    },
    errorMessage: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        margin: 10,
        color: 'red',
    },
    //New
    containerNew: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }, 
})