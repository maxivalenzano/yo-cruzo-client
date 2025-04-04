import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '../components/Chat/ChatListScreen';
import ChatScreen from '../components/Chat/ChatScreen';

const Stack = createNativeStackNavigator();

function ChatNavigator() {
  return (
    <Stack.Navigator initialRouteName="ChatList">
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatConversation"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ChatNavigator;
