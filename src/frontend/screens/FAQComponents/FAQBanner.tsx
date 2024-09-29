import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigate } from 'react-router-dom';

export default function BannerCard() {
    const navigate = useNavigate();

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.logoContainer}
                onPress={() => navigate('/SettingsNavigation', { state: { uid: 86 } })}
            >
                <Image 
                    source={require('../images/FeastFinder-solid-circle.png')}
                    style={styles.cardImage}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        // Aligns the entire banner at the top
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#555555',
    },
    logoContainer: {
        flex: 1, // Ensure the logo container can grow
    },
    cardImage: {
        height: 90,
        width: 120,
        margin: 5,
    },
});
