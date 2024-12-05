import { Image, Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'

import Drawer from '@mui/material/Drawer'
import { useNavigate } from 'react-router-dom';
import CoreStyles from './CoreStyles.tsx';
import { useAuth } from '../UserComponents/Authorizer.tsx';
import ChatSupport from '../SettingsPages/ChatComponents/ChatSupport.tsx';
import { useDarkMode } from "./DarkModeContext.tsx";

const CoreDrawer = ({open, setOpen}) => {
    const [openChat, setOpenChat] = useState(false);
    const navigate = useNavigate();
    const {logout} = useAuth();
    const { coreStyles } = CoreStyles();
    const styles = CoreStyles().coreDrawerStyles
    const { darkMode } = useDarkMode();

    const navPages = [
        {
            navFunc: () => { navigate('/Home') },
            navImg: darkMode? require('../images/homeDark.png') : require('../images/home.png'),
            navText: 'Home',
        },
        {
            navFunc: () => { navigate('/AccountPage') },
            navImg: darkMode? require('../images/accountDark.png') : require('../images/account.png'),
            navText: 'Account',
        },
        {
            navFunc: () => { navigate('/FAQPage')},
            navImg: darkMode? require('../images/faqDark.png') : require('../images/faq.png'),
            navText: 'FAQ',
        },
        {
            navFunc: ()=>{setOpenChat(true)},
            navImg: darkMode? require('../images/chatSupportDark.png') : require('../images/chatSupport.png'),
            navText: 'Support',
        },
        {
            navFunc: () => { navigate('/SuggestionPage')},
            navImg: darkMode? require('../images/suggestionDark.png') : require('../images/suggestion.png'),
            navText: 'Suggestions',
        },
        {
            navFunc: () => { navigate('/ReportBugPage')},
            navImg: darkMode? require('../images/reportBugDark.png') : require('../images/reportBug.png'),
            navText: 'Report Bugs',
        },
        {
            navFunc: () => { navigate('/PastOrdersPage') },
            navImg: darkMode? require('../images/pastOrdersDark.png') : require('../images/pastOrders.png'), // Ensure you have this image
            navText: 'Past Orders',
        },
    ];

    return (
        <View>
            <Pressable
            onPress={()=>setOpen(true)}
            >
                <Image
                source={darkMode? require('../images/menu.png') : require('../images/menuDark.png')}
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