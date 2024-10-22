import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Drawer from '@mui/material/Drawer'
import { useNavigate } from 'react-router-dom';
import { coreStyles } from '../CoreStyles.tsx';

const CoreDrawer = ({open, setOpen}) => {
    const navigate = useNavigate();

    const navPages = [
        {
            navRoute: '/Home',
            navImg: require('../../images/home.png'),
            navText: 'Home',
        },
        {
            navRoute: '/AccountPage',
            navImg: require('../../images/account.png'),
            navText: 'Account',
        },
        {
            navRoute: '/FAQPage',
            navImg: require('../../images/faq.png'),
            navText: 'FAQ',
        },
        {
            navRoute: '/ChatSupport',
            navImg: require('../../images/chatSupport.png'),
            navText: 'Support',
        },
        {
            navRoute: '/SuggestionPage',
            navImg: require('../../images/suggestion.png'),
            navText: 'Suggestions',
        },
        {
            navRoute: '/ReportBugPage',
            navImg: require('../../images/reportBug.png'),
            navText: 'Report Bugs',
        },
    ]

    return (
        <View>
            <Pressable
            onPress={()=>setOpen(true)}
            >
                <Image
                source={require('../../images/menu.png')}
                style={styles.menuImage}
                />
            </Pressable>
            <Drawer anchor='right' open={open} onClose={()=>setOpen(false)}>
                <View
                >
                    <View
                    style={styles.menuHeader}
                    >
                        <Text
                        style={[coreStyles.headingText, {margin:0}]}
                        >
                            Navigation:
                        </Text>
                    </View>
                    {navPages.map((item, index)=>(
                        <Pressable
                        style={styles.card}
                        onPress={() => { navigate(item.navRoute) }}
                        >
                            <Image
                            source={item.navImg}
                            style={styles.navImage}
                            />
                            <View
                            style={styles.navTextContainer}
                            >
                                <Text
                                style={styles.navText}
                                >
                                    {item.navText}
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </Drawer>
        </View>
    )
}

export default CoreDrawer

const styles = StyleSheet.create({
    menuHeader: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    menuImage: {
        height: 40,
        width: 40,
        marginRight: 15,
    },
    navImage: {
        width:30,
        height:30,
        marginLeft: 20,
        marginRight: 40,
    },
    navTextContainer: {
        width: 180,
        paddingRight: 20,
    },
    navText: {
        fontSize: 20
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
})