import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 12,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  theirMessage: {
    alignSelf: 'flex-start',
  },
  bubble: {
    padding: 12,
    borderRadius: 18,
  },
  myBubble: {
    backgroundColor: '#F85F6A',
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    backgroundColor: '#E8E8E8',
    borderBottomLeftRadius: 4,
  },
  myText: {
    color: 'white',
  },
  theirText: {
    color: 'black',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myTimestamp: {
    color: '#999',
  },
  theirTimestamp: {
    color: '#888',
  },
  readStatus: {
    fontSize: 10,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 4,
  },
  readText: {
    color: '#999',
    marginRight: 3,
  },
});

function formatTime(date) {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function ChatBubble({ message, isCurrentUser, showTimestamp }) {
  return (
    <View style={[styles.container, isCurrentUser ? styles.myMessage : styles.theirMessage]}>
      <View style={[styles.bubble, isCurrentUser ? styles.myBubble : styles.theirBubble]}>
        <Text style={isCurrentUser ? styles.myText : styles.theirText}>{message.message}</Text>
      </View>

      {showTimestamp && (
        <View style={styles.readStatus}>
          <Text
            style={[styles.timestamp, isCurrentUser ? styles.myTimestamp : styles.theirTimestamp]}
          >
            {formatTime(message.createdAt)}
          </Text>
        </View>
      )}
    </View>
  );
}

export default ChatBubble;
