import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.botContainer]}>
      
      <View style={styles.bubbleWrapper}>
        <View style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.botBubble
        ]}>
          <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>
            {message.content}
          </Text>
        </View>
        
        {/* Add a separate, more visible tail */}
        {isUser ? (
          <View style={styles.userTail} />
        ) : (
          <View style={styles.botTail} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    maxWidth: '75%',
    paddingHorizontal:10
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  botContainer: {
    alignSelf: 'flex-start',
  },
  botTag: {
    backgroundColor: '#000000',
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  botTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  bubbleWrapper: {
    position: 'relative',
  },
  bubble: {
    padding: 12,
    minWidth: 60,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#f5dfb9',
    borderBottomRightRadius: 0, 
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  botBubble: {
    backgroundColor: '#000',
    borderBottomLeftRadius: 0, 
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#000',
  },
  botText: {
    color: '#fff',
  },
  // Custom triangular tails
  userTail: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 16, // Wider tail
    height: 16, // Taller tail
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopColor: '#f5dfb9',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  botTail: {
    position: 'absolute',
    bottom: -8,
    left: -8,
    width: 16, // Wider tail
    height: 16, // Taller tail
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 8,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 8,
    borderTopColor: '#000',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  },
});

export default ChatBubble;
