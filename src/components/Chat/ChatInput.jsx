import React, { useState } from 'react';
import {
  View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#F85F6A',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: '#E8E8E8',
  },
});

function ChatInput({ onSend, sending = false }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() === '' || sending) return;

    onSend(message.trim());
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribir mensaje..."
        value={message}
        onChangeText={setMessage}
        multiline
        maxLength={500}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          message.trim() === '' ? styles.disabledSendButton : null,
        ]}
        onPress={handleSend}
        disabled={message.trim() === '' || sending}
      >
        {sending ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Ionicons name="send" size={22} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default ChatInput;
