import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ffColors } from './CoreStyles.tsx'
import CoreDrawer from './CoreDrawer.tsx'

interface Props {
    searchVal?: string
}
const CoreBanner: React.FC<Props> = ({searchVal}) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchTerm] = React.useState(searchVal)
    const [deliveryService, setDeliveryService] = React.useState('') // New state for delivery service

    const navigate = useNavigate();
    const location = useLocation();

    function navigationHandler() {
        if(location.pathname !== '/Home' && location.pathname !== '/') {
            navigate('/Home');
        }
    }

    // Send search query and delivery service to the backend
    const keyHandler = async (event) => {
        if (event.key === 'Enter' && searchValue !== '') {
            console.log("Searching for: " + searchValue + " with service: " + deliveryService);

            try {
                // Send the request to your backend API with the selected delivery service
                const response = await fetch(`http://localhost:5001/api/searchRestaurant?name=${searchValue}&service=${deliveryService}`);
                
                if (response.ok) {
                    const restaurants = await response.json();
                    console.log('Restaurants Found:', restaurants);
                    navigate('/Search', {state: {search: searchValue, restaurants: restaurants, deliveryService}});
                } else {
                    console.log('No restaurants found');
                    navigate('/Search', {state: {search: searchValue, restaurants: undefined, deliveryService, errorText: 'No restaurants found'}})
                }
            } catch (error) {
                console.error('Error fetching restaurant:', error);
                navigate('/Search', {state: {search: searchValue, restaurants: undefined, deliveryService, errorText: 'Error fetching restaurant:'}})
            }
        }
    };

    const inputHandler = (event) => {
        setSearchTerm(event.target.value);
    }

    const deliveryServiceHandler = (event) => {
        setDeliveryService(event.target.value);
    }

    return (
        <View>
            <View 
            style={styles.card}
            >
                <Pressable
                style={styles.cardImageHolder}
                onPress={navigationHandler}
                >
                    <Image 
                    source={require('../images/FeastFinder-solid-circle.png')}
                    style={styles.cardImage}
                    />
                </Pressable>
                <input
                type='text'
                style={styles.search}
                onChange={inputHandler}
                value={searchValue}
                placeholder='Search...'
                onKeyDown={keyHandler}
                />
                {/* New dropdown for selecting delivery service */}
                <select
                style={styles.dropdown}
                onChange={deliveryServiceHandler}
                value={deliveryService}
                >
                    <option value=''>All Services</option>
                    <option value='UberEats'>UberEats</option>
                    <option value='Grubhub'>Grubhub</option>
                    <option value='DoorDash'>DoorDash</option>
                </select>
                <CoreDrawer
                open={open}
                setOpen={setOpen}
                />
            </View>
        </View>
    )
}

export default CoreBanner;

const styles = StyleSheet.create({
    search:{
        height: 60,
        margin: 20,
        marginRight: 25,
        borderWidth: 1,
        flexGrow: 1,
        borderRadius: 20,
        padding: 10,
    },
    dropdown: {
        height: 60,
        margin: 20,
        marginLeft: 10,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#ffffff'
    },
    card: {
        width: '100%',
        backgroundColor: ffColors.ffGreenD,
        flexDirection: 'row',
        alignItems: 'center'
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
    }
})
