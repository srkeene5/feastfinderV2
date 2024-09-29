import React from 'react'

import { 
    Image, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    View 
} from 'react-native'


// navigation
import { RootStackParamList } from "../../App.tsx";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigate } from 'react-router-dom';


export default function BannerCard() {
    const navigate = useNavigate();

    const goToSignup = (id, name) => {
        navigate('/account/signup', { state: { userId: 123, name: 'user' } });  // Replaces navigation.navigate("Profile")
    };
    const [text, onChangeText] = React.useState('')

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    return (
        <View>
            <View 
            style={styles.card}
            >
                <TouchableOpacity 
                style={styles.button}
                onPress={() => {goToSignup('123', 'user')}}
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