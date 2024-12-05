// src/frontend/screens/SettingsPages/ChatComponents/ChatSupport.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CoreStyles from '../../CoreComponents/CoreStyles.tsx';
import { Drawer } from '@mui/material';
import tw from 'twrnc';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config.js';

const ChatSupport = ({ open, setOpen }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! How can I assist you today?" },
  ]);
  const [message, setMessage] = useState('');
  const [messageNID, setMessageNID] = useState(1);
  const chatScrollView = useRef<ScrollView>(null);
  const { coreForm } = CoreStyles();
  const styles = CoreStyles().chatSupportStyles

  useEffect(() => {
    if (chatScrollView.current) {
      chatScrollView.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async (userMessageContent: string) => {
    const userMessage = { role: 'user', content: userMessageContent };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);


  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        messages: updatedMessages,
      });
  
      const assistantMessage = {
        role: 'assistant',
        content: response.data.reply,
      };
  
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setMessageNID((prevID) => prevID + 2);
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      const errorMessage = {
        role: 'assistant',
        content: "I'm sorry, something went wrong on our end.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const keyHandler = async (event) => {
    if (event.key === 'Enter' && message.trim() !== '') {
      const userMessageContent = message.trim();
      setMessage('');
      await sendMessage(userMessageContent);
    }
  };

  const renderMessageContent = (content: string) => {
    const regex = /\[([^\]]+)]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = []; // Explicitly type the array
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      parts.push(
        <Link key={match[2]} to={match[2]} style={styles.link}>
          {match[1]}
        </Link>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts;
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <View style={styles.chatContainer}>
        <View style={styles.header}>
          <Text style={[tw.style(coreForm.subtitle), { marginTop: 10 }]}>Chat Support</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          ref={chatScrollView}
        >
          {messages.map((item, index) => (
            <Text
              key={index}
              style={[
                styles.chatBubble,
                item.role === 'user' ? styles.userBubble : styles.otherBubble,
              ]}
            >
              {renderMessageContent(item.content)}
            </Text>
          ))}
        </ScrollView>
        <View style={styles.textInput}>
          <input
            style={coreForm.textInputSingle}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            value={message}
            placeholder="Message..."
            onKeyDown={keyHandler}
          />
        </View>
      </View>
    </Drawer>
  );
};

export default ChatSupport;
