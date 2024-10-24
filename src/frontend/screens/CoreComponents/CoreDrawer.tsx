import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import Drawer from '@mui/material/Drawer'
import { useNavigate } from 'react-router-dom';
import { coreStyles, ffColors } from './CoreStyles.tsx';
import { useAuth } from '../UserComponents/Authorizer.tsx';
import ChatSupport from '../SettingsPages/ChatComponents/ChatSupport.tsx';

const CoreDrawer = ({open, setOpen}) => {
    const [openChat, setOpenChat] = useState(false);
    const navigate = useNavigate();
    const {logout} = useAuth();

    const navPages = [
        {
            navFunc: () => { navigate('/Home') },
            navImg: require('../images/home.png'),
            navText: 'Home',
        },
        {
            navFunc: () => { navigate('/AccountPage') },
            navImg: require('../images/account.png'),
            navText: 'Account',
        },
        {
            navFunc: () => { navigate('/FAQPage')},
            navImg: require('../images/faq.png'),
            navText: 'FAQ',
        },
        {
            navFunc: ()=>{setOpenChat(true)},
            navImg: require('../images/chatSupport.png'),
            navText: 'Support',
        },
        {
            navFunc: () => { navigate('/SuggestionPage')},
            navImg: require('../images/suggestion.png'),
            navText: 'Suggestions',
        },
        {
            navFunc: () => { navigate('/ReportBugPage')},
            navImg: require('../images/reportBug.png'),
            navText: 'Report Bugs',
        },
    ];

    return (
        <View>
            <Pressable
            onPress={()=>setOpen(true)}
            >
                <Image
                source={require('../images/menu.png')}
                style={styles.menuImage}
                />
            </Pressable>
            <Drawer anchor='right' open={open} onClose={()=>setOpen(false)}>
                <View style={styles.navContainer}>
                    <View>
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
                        key={item.navText}
                        style={styles.card}
                        onPress={item.navFunc}
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
                    <Pressable
                    style={[styles.card, styles.logout]}
                    onPress={logout}
                    >
                        <Image
                        source={require('../images/logout.png')}
                        style={styles.navImage}
                        />
                        <View style={styles.navTextContainer}>
                            <Text style={[styles.navText, {color: 'white'}]}>
                                Logout
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </Drawer>
            <ChatSupport 
            open={openChat}
            setOpen={setOpenChat}
            />
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
    navContainer: {
        flex:1,
        justifyContent: 'space-between'
    },
    logout: {
        backgroundColor: ffColors.ffRedL
    },
})