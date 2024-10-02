import React from 'react'

import { 
    SafeAreaView,
    ScrollView, 
    StyleSheet,
    Text, 
    Image,
    View,
    Pressable,
} from 'react-native'

import { useAuth } from '../UserComponents/Authorizer.tsx';

import Popup from 'reactjs-popup'

// navigation
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchCards() {

    const navigate = useNavigate();
    const location = useLocation();
    const {search, restaurants = [], deliveryService, errorText} = location.state;

    const [userValue, setuserValue] = React.useState('');
    const [passValue, setPassValue] = React.useState('');
    const [errPop, setErrPop] = React.useState(false)
    const [errText, setErrText] = React.useState('Error Undefined')
    const [loginPop, setLoginPop] = React.useState(false)
    const [buttonService, setButtonService] = React.useState('Error Undefined')
    const [holdItem, setHoldItem] = React.useState(null);
    const { user } = useAuth();

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

    const resetUserPass = () => {
        setuserValue('');
        setPassValue('');
    }

    const popSubmitHandler = async () => {
        if (!userValue) {
            setErrText("Username Blank");
            setErrPop(true);
            return;
        } else if (!passValue) {
            setErrText("Password Blank");
            setErrPop(true);
            return;
        }

        try {
            var response
            var fetchAddr = 'http://localhost:5001/api/auth/'
            switch (buttonService) {
                case "DoorDash":
                    fetchAddr += 'doordashlogin';
                    response = await fetch(fetchAddr, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization' : "Bearer " + user.token
                        },
                        body: JSON.stringify({
                            doordash_email: userValue,
                            doordash_password: passValue,
                        }),
                    });
                    break;
                case "GrubHub":
                    fetchAddr += 'grubhublogin';
                    response = await fetch(fetchAddr, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization' : "Bearer " + user.token
                        },
                        body: JSON.stringify({
                            grubhub_email: userValue,
                            grubhub_password: passValue,
                        }),
                    });
                    break;
                case "UberEats":
                    fetchAddr += 'uberlogin';
                    response = await fetch(fetchAddr, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization' : "Bearer " + user.token
                        },
                        body: JSON.stringify({
                            uber_email: userValue,
                            uber_password: passValue,
                        }),
                    });
                    break;
                default:
                    console.error('switchFailure');
                    setErrText("Internal Service Error\nDelivery Service not recognized");
                    setErrPop(true);
                    return;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Failed to register');
            }

            console.log('Registration successful:', data);
            setLoginPop(false); 
            setButtonService('Error Undefined');
            resetUserPass();
            navigate('/restaurant', {state: {restaurant: holdItem, service: buttonService}})
        } catch (err) {
            setErrText(err.message);
            setErrPop(true);
        }
    }

    const checkLogin = async (service: string, item) => {
        var fetchAddr = 'http://localhost:5001/api/auth/'
        switch (service) {
            case "DoorDash":
                fetchAddr += 'doordash';
                break;
            case "GrubHub":
                fetchAddr += 'grubhub';
                break;
            case "UberEats":
                fetchAddr += 'uber';
                break;
            default:
                console.error('switchFailure');
                setErrText("Internal Service Error\nDelivery Service not recognized");
                setErrPop(true);
                return;
        }
        fetchAddr += 'login/status';
        
        //setHoldItem(item)
        //setButtonService(service);
        //setLoginPop(true);
        try {
            const res = await fetch(fetchAddr, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : "Bearer " + user.token
                },
            });
            if (res.ok) {
                const data = await res.json();
                var isStored
                switch (service) {
                    case "DoorDash":
                        isStored = data.doordash_stored;
                        break;
                    case "GrubHub":
                        isStored = data.grubhub_stored;
                        break;
                    case "UberEats":
                        isStored = data.uber_stored;
                        break;
                    default:
                        console.error('switchFailure');
                        setErrText("Internal Service Error\nDelivery Service not recognized");
                        setErrPop(true);
                        return;
                }

                console.log("LoggedIn "+(isStored))
                if (isStored) {
                    console.log('fetch: Successful');
                    navigate('/restaurant', {state: {restaurant: item, service: service}})
                } else {
                    setHoldItem(item);
                    setButtonService(service);
                    setLoginPop(true);
                }
            } else {
                const errorData = await res.json();
                console.error('Error during login:', errorData);
                setErrText(errorData.msg);
                setErrPop(true);  // Set error state on failure
            }
        } catch(error){
            console.error('Network error:', error);
            setErrText("Network error\nCheck internet connection");
            setErrPop(true);  // Handle network error
        }
    }

    const APIButton = (service: string, available: boolean, item) => {
        if (available) {
            return (
                <Pressable
                onPress={() => {checkLogin(service, item)}}
                style={styles.buttons}
                >
                    <Text
                    style={styles.buttonText}
                    >
                        {service}
                    </Text>
                </Pressable>
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
                            {APIButton("DoorDash", item.doordashAvailable, item)}
                            {APIButton("GrubHub", item.grubhubAvailable, item)}
                            {APIButton("UberEats", item.uberEatsAvailable, item)}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

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

    //-----Popular Cards Exported-----
    return (
        <SafeAreaView>
            <Text 
            style={styles.headingText}
            >
                Results for:   {search}
            </Text>
            {restItems()}

            <Popup 
            open={errPop} 
            onClose={()=>{setErrPop(false); setErrText('Error Undefined')}}
            contentStyle={styles.popup}
            >
                <View>
                    <Text
                    style={styles.errorText}
                    >
                        Error: 
                    </Text>
                </View>
                <View>
                    <Text
                    style={styles.popupText}
                    >
                        {errText}
                    </Text>
                </View>
                <View
                style={styles.buttonContainer}
                >
                    <Pressable
                    onPress={()=>{setErrPop(false); setErrText('Error Undefined')}}
                    style={styles.popupButton}
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Close
                        </Text>
                    </Pressable>
                </View>
            </Popup>

            <Popup 
            open={loginPop} 
            onClose={()=>{setLoginPop(false); setButtonService('Error Undefined'); resetUserPass();}}
            contentStyle={styles.popup}
            >
                <View>
                    <Text
                    style={styles.errorText}
                    >
                        Not logged into {buttonService}: 
                    </Text>
                </View>
                <View
                style={styles.loginContainer}
                >
                    <Text
                    style={styles.popupText}
                    >
                        Login:
                    </Text>
                    <input
                    style={styles.popInput}
                    onChange={(event)=>{setuserValue(event.target.value)}}
                    value = {userValue}
                    placeholder='Username...'
                    />
                    <input
                    style={styles.popInput}
                    onChange={(event)=>{setPassValue(event.target.value)}}
                    value = {passValue}
                    placeholder='Password...'
                    />
                </View>
                <View
                style={styles.buttonContainer}
                >
                    <Pressable
                    onPress={()=>{popSubmitHandler()}}
                    style={styles.popupSubmitButton}
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Submit
                        </Text>
                    </Pressable>
                    <Pressable
                    onPress={()=>{setLoginPop(false); setButtonService('Error Undefined'); resetUserPass()}}
                    style={styles.popupButton}
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Close
                        </Text>
                    </Pressable>
                </View>
            </Popup>
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
    popup: {
        width: 450,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        //backgroundColor: 'red'
    },
    popupText: {
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    errorText: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff3333'
    },
    popupButton: {
        backgroundColor: '#dd3333',
        width: 100,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    popupSubmitButton: {
        backgroundColor: '#33aa33',
        width: 100,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'space-evenly',
    },
    popInput:{
        height: 'auto',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
    },
    loginContainer: {
        margin: 20
    },
})