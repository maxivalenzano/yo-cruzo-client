import axios from '../axios/axios';
import { getCurrentUserId } from '../helpers/authHelpers';
import handler from '../helpers/handler';

function getChats() {
  const userId = getCurrentUserId();

  const url = `/api/chat/user/${userId}`;
  return axios.get(url)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getChatHistory(chatId) {
  const userId = getCurrentUserId();

  const url = `/api/chat/${chatId}/user/${userId}`;
  return axios.get(url)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getChatByTripRequest(tripRequestId) {
  const userId = getCurrentUserId();

  const url = `/api/chat/user/${userId}/triprequest/${tripRequestId}`;
  return axios.get(url)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function sendMessage(chatId, message, receiverId) {
  const url = `/api/chat/${chatId}/message`;
  return axios.post(url, { message, receiverId })
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function markMessagesAsRead(chatId) {
  const userId = getCurrentUserId();

  const url = `/api/chat/${chatId}/user/${userId}/read`;
  return axios.put(url)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

const ChatService = {
  getChats,
  getChatHistory,
  getChatByTripRequest,
  sendMessage,
  markMessagesAsRead,
};

export default ChatService;
