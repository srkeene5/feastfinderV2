import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { coreForm, ffColors } from '../../CoreComponents/CoreStyles.tsx'
import { Drawer } from '@mui/material';
import tw from 'twrnc';
import { Link } from 'react-router-dom';



const ChatSupport = ({open, setOpen}) => {
  //-----Original Code-----
  const responses = {
    'help with an order': {
      text: 'Which service are you using? DoorDash, Uber Eats, or GrubHub?',
      nextStep: 'order_service'
    },
    'help with my account': {
      text: 'You can manage your account settings here:\n',
      internalLink: '/AccountPage' // Internal link to AccountPage
    },
    'doordash': {
      text: 'You can get help with your DoorDash order here:\n',
      link: 'https://help.doordash.com/consumers/s/consumer-support?language=en_US'
    },
    'uber eats': {
      text: 'You can get help with your Uber Eats order here:\n',
      link: 'https://help.uber.com/en/ubereats/restaurants'
    },
    'grubhub': {
      text: 'You can get help with GrubHub here:\n',
      link: 'https://about.grubhub.com/media/contact-us/'
    },
    'login': {
      text: 'You can reset your login or password on the account recovery page.\n',
      link: 'https://your-login-reset-page-url.com' // Replace with actual reset URL
    },
    'talk to human support': {
      text: 'Please contact our support team at support@company.com or call 1-800-123-4567.'
    }
  };
  const [nextStep, setNextStep] = useState<string | null>(null);
  
  const submitQuery = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
  
    // "Talk to human support" can be triggered at any time
    if (lowerCaseQuery.includes('talk to human support')) {
      return responses['talk to human support'];
    }
  
    // If there's a current step (e.g., user has already selected something like 'order_service')
    if (nextStep) {
      if (
        nextStep === 'order_service' &&
        (lowerCaseQuery === 'doordash' || lowerCaseQuery === 'uber eats' || lowerCaseQuery === 'grubhub')
      ) {
        setNextStep(null);  // Reset after handling the follow-up step
        return responses[lowerCaseQuery];
      } else {
        return { text: 'Sorry, I didn’t recognize that. Please try again.' };
      }
    } else {
      // Handle the initial query
      const replyData = responses[lowerCaseQuery];
      if (replyData) {
        setNextStep(replyData.nextStep || null);  // If there’s a next step, track it
        return replyData;
      } else {
        return {text: "Sorry, I couldn't understand you. Please try: 'help with an order', 'help with my account', or 'talk to human support'" };
      }
    }
  };
  //-----Original Code-----

  const [messages, setMessages] = React.useState<{ message: string; sender: boolean; link?: string; internalLink?: string }[]>([{message: "Hello! How can I help you today? You can say 'help with an order', 'help with my account', or 'talk to human support'.", sender: false}])
  const [message, setMessage] = React.useState('')
  const chatScrollView = useRef<ScrollView>(null);

  useEffect(()=>{
    if (chatScrollView.current){
      chatScrollView.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const keyHandler = async (event) => {
    if (event.key === 'Enter' && message !== '') {
      setMessages([...messages, {message: message, sender: true}]);
      var response = submitQuery(message);
      setMessage('');
      setTimeout(()=>{
        setMessages([...messages, {message: message, sender: true}, {message: response.text, sender: false, link: response.link, internalLink: response.internalLink}]);
      },1000);
    }
  };
  
  return (
    <Drawer anchor='right' open={open} onClose={()=>setOpen(false)}>
      <View
      style={styles.chatContainer}
      >
        <View
        style={styles.header}
        >
          <Text style={[tw.style(coreForm.subtitle), {marginTop: 10}]}>Chat Support</Text>
        </View>
        <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        ref={chatScrollView}
        >
          {messages.map((item)=>(
            <Text
            style={[styles.chatBubble, item.sender ? styles.userBubble : styles.otherBubble]}
            >
              {item.message}
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                  Click here for more details
                </a>
              )}
              {item.internalLink && (
                <Link to={item.internalLink} style={styles.link}>
                  Go to Account Settings
                </Link>
              )}
            </Text>
          ))}
        </ScrollView>
        <View style={styles.textInput}>
          <input
          style={coreForm.textInputSingle}
          onChange={(event)=>{setMessage(event.target.value)}}
          value = {message}
          placeholder='Message...'
          onKeyDown={keyHandler}
          />
        </View>
      </View>
    </Drawer>
  )
}

export default ChatSupport

const styles = StyleSheet.create({
  chatBubble: {
    padding: 8,
    paddingTop: 6,
    borderRadius: 10,
    marginBottom: 4,
    maxWidth: 200,
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
  chatContainer: {
    flex: 1,
    width: 300,
    height: '100%',
    display: 'flex',
  },
  header: {
    borderBottomColor: ffColors.ffEdge,
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  textInput: {
    backgroundColor: ffColors.ffGreyL,
    padding: 10,
    paddingBottom:15,
  },
  scroll: {
    flex: 1,
    padding: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
})