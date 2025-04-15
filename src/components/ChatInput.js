import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Text, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatInput = ({ onSend, isTyping }) => {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (message.trim() && !isTyping) {
      onSend(message);
      setMessage('');
    }
  };
  
  return (
    <View style={styles.container}>
      {isTyping && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#000000" />
          <Text style={styles.typingText}>Bot is typing...</Text>
        </View>
      )}
      
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Tell us your travel plans..."
          placeholderTextColor="#999999"
          value={message}
          onChangeText={setMessage}
          multiline
          maxHeight={100}
          editable={!isTyping}
          keyboardAppearance="light" // This forces light keyboard on iOS
        />
        
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!message.trim() || isTyping}
        >
          <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    padding: 12,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  typingText: {
    color: '#888888',
    marginLeft: 8,
    fontSize: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    color: '#000000',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#000000',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatInput;