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

export default function SearchCards() {
    /*const restaurants = [
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
    ];*/

    const navigate = useNavigate();
    const location = useLocation();
    const {search, restaurants} = location.state;

    const restItem = (item: { rid: number; name: string; color: string; }) => {
        return (
            <View
            key={item.rid}
            style={[styles.card, ]}
            >
                <Image 
                    source={require('../images/—Pngtree—store icon_4835876.png')}
                    style={styles.cardImage}
                />
                <View
                style={[styles.cardContent, {backgroundColor: item.color}]}
                >
                    <View
                    style={styles.cardText}
                    >
                        <Text
                        style={styles.cardTitle}
                        >
                            {item.name}
                        </Text>
                        <Text
                        style={styles.cardDist}
                        >
                            Distance: 
                        </Text>
                    </View>
                    <View
                    style={styles.buttonContent}
                    >
                        <TouchableOpacity
                        onPress={() => {navigate('/restaurant', {state: {rid: item.rid, rName: item.name, color: item.color, service: "DoorDash"}})}}
                        style={styles.buttons}
                        >
                            <Text
                            style={styles.buttonText}
                            >
                                DoorDash
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => {navigate('/restaurant', {state: {rid: item.rid, rName: item.name, color: item.color, service: "GrubHub"}})}}
                        style={styles.buttons}
                        >
                            <Text
                            style={styles.buttonText}
                            >
                                GrubHub
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => {navigate('/restaurant', {state: {rid: item.rid, rName: item.name, color: item.color, service: "UberEats"}})}}
                        style={styles.buttons}
                        >
                            <Text
                            style={styles.buttonText}
                            >
                                UberEats
                            </Text>
                        </TouchableOpacity>
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
            <ScrollView
            style={styles.container}
            //horizontal={true}
            >
                {restaurants.map((item) => {
                    return restItem(item);
                })}
            </ScrollView>
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
        marginTop: 5
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
    buttonText: {
        fontWeight: 'bold',
    },
    buttonContent: {
        height: '50%',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
})