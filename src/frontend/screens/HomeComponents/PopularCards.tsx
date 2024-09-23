import { ColorValue, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

// navigation
import { RootStackParamList } from "../../App";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function PopularCards() {
    const restaurants = [
        {
            rid: 1,
            name: 'rest1-red',
            color: '#Ef5354'
        },
        {
            rid: 2,
            name: 'rest2-green',
            color: '#50DBB4'
        },
        {
            rid: 3,
            name: 'rest3-blue',
            color: '#5da3fa'
        },
        {
            rid: 4,
            name: 'rest4-yellow',
            color: '#ffff00'
        },
        {
            rid: 5,
            name: 'rest5-orange',
            color: '#ff8800'
        },
        {
            rid: 6,
            name: 'rest6-purple',
            color: '#aa00ff'
        },
    ];

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()


    const restItem = (item: { rid: number; name: string; color: string; }) => {
        return (
            <TouchableOpacity
            key={item.rid}
            style={[styles.card, {backgroundColor: item.color}]}
            onPress={() => navigation.navigate(
                "RestPage", 
                {rid: item.rid, rName: item.name, color: item.color}
            )}
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