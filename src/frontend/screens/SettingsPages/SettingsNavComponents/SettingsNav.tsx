import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CoreBanner from '../../CoreComponents/CoreBanner.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CoreStyles from '../../CoreComponents/CoreStyles.tsx';

export default function SettingsNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { uid } = location.state;
    const { coreStyles } = CoreStyles();

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <CoreBanner />
                    <Text style={coreStyles.headingText}>
                        NavigationPage: {uid}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => { navigate('/AccountPage', { state: { uid: 86 } }) }}
                    >
                        <Text>Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => { navigate('/ReportBugPage', { state: { uid: 86 } }) }}
                    >
                        <Text>Report Bugs</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => { navigate('/SuggestionPage', { state: { uid: 86 } }) }}
                    >
                        <Text>Suggestions</Text>
                    </TouchableOpacity>

                    {/* Link to FAQ Page */}
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => { navigate('/FAQPage', { state: { uid: 86 } }) }} // Adjust as needed
                    >
                        <Text>FAQ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => { navigate('/PastOrdersPage', { state: { uid: 86 } }) }}
                    >
                        <Text>Past Orders</Text>
                    </TouchableOpacity>
                    
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        margin: 8,
        elevation: 5,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor: 'lightblue',
    },
});
