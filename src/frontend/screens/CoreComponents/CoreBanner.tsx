import { Image, StyleSheet, TouchableOpacity, TextInput, View } from 'react-native'
import React from 'react'

// navigation
import { RootStackParamList } from "../../App";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function CoreBanner() {
    const [text, onChangeText] = React.useState('')

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    return (
        <View>
            <View 
            style={styles.card}
            >
                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.popToTop()}
                >
                    <Image 
                    source={require('../images/FeastFinder-solid-circle.png')}
                    style={styles.cardImage}
                    />
                </TouchableOpacity>
                <TextInput
                style={styles.search}
                onChangeText={onChangeText}
                value = {text}
                placeholder='Search'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    button: {
        flex: 1
    },
    search:{
        height: 60,
        margin: 20,
        marginRight: 25,
        borderWidth: 1,
        flexGrow: 1
    },
    card: {
        //banner covers top
        width: '100%',
        backgroundColor: '#555555',
        flexDirection: 'row'
    },
    cardImage: {
        //ratio MUST be 3:4
        height: 90,
        width: 120,
        margin: 5
    }
})