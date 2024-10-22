import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CoreBanner from '../../CoreComponents/CoreBanner.tsx'
import ChatPopup from './Chat.tsx'
import { ffColors } from '../../CoreComponents/CoreStyles.tsx'

const ChatSupport = () => {
  var messages = [
    {
      message: 'text',
      sender: true,
    },
    {
      message: 'textdddddddddd testa atsefafd fadseaffafefdfeaef ',
      sender: true,
    },
    {
      message: 'text',
      sender: false,
    },
  ]
  
  return (
    <View>
      <CoreBanner/>
      <ScrollView
      style={styles.chat}
      >
        {messages.map((item, index)=>(
          <View
          style={styles.chatBubbleContainer}
          >
            <Text
            style={[styles.chatBubble, item.sender ? styles.userBubble : styles.otherBubble]}
            >
              {item.message}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default ChatSupport

const styles = StyleSheet.create({
  chatBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: 150,
  },
  userBubble: {
    backgroundColor: ffColors.ffGreenL,
    color: 'white',
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  chatBubbleContainer: {

  }, 
  chat: {
    padding: 20
  }, 
  chatContainer: {

  },
})