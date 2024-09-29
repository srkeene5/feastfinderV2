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
                style={styles.buttonText}
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
    const {search, restaurants, errorText} = location.state;

    const restItems = () => {
        if (restaurants !== undefined && restaurants.length !== 0) {
            return(
                <ScrollView
                style={styles.container}
                >
                    {restaurants.map((item) => {
                        return restItem(item);
                    })}
                </ScrollView>
            )
        } 
        else {
            return (
                <View
                style={styles.errorPage}
                >
                    <Text
                    style={styles.errorMessage}
                    >
                        {errorText}
                    </Text>
                </View>
            )
        }
    }

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
                        style={styles.cardTitle}
                        >
                            {item.restaurantName}
                        </Text>
                        <Text
                        style={styles.cardDist}
                        >
                            Distance: {item.distance}
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
        width: 600,
        height: 200,
        borderRadius: 15,
        margin: 8,
        elevation: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#333',
        shadowOpacity: .5,
        shadowRadius: 2,
        backgroundColor: '#000000',
        flexDirection: 'row',
    },
    cardImage: {
        height: 190,
        width: 190,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        marginTop: 5,
        marginLeft:5,
    },
    cardContent: {
        height: 190,
        width: 400,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5,
        marginTop: 5,
        backgroundColor: 'white',
    },
    cardText: {
        height: '50%',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardDist: {
        fontSize: 15,
    },
    buttons: {
        backgroundColor: '#ff0000',
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
        fontWeight: 'bold',
    },
    buttonContent: {
        height: '50%',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
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
})