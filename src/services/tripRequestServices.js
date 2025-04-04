/* eslint-disable no-underscore-dangle */
import axios from '../axios/axios';
import handler from '../helpers/handler';
import { getCurrentUserId } from '../helpers/authHelpers';

function create(trip) {
  const userId = getCurrentUserId();
  const postUrl = `/api/triprequest/${userId}/${trip.id}`;
  return axios.post(postUrl, trip).then(handler.handleResponse).catch(handler.handleError);
}

function getAllTripRequestForPassenger() {
  const userId = getCurrentUserId();
  const postUrl = `/api/triprequest/passenger/${userId}`;
  return axios.get(postUrl).then(handler.handleResponse).catch(handler.handleError);
}

function getAllTripRequestForDriver() {
  const userId = getCurrentUserId();
  const postUrl = `/api/triprequest/driver/${userId}`;
  return axios.get(postUrl).then(handler.handleResponse).catch(handler.handleError);
}

function acceptTripRequest(requestId) {
  const userId = getCurrentUserId();
  const postUrl = `/api/triprequest/accept/${userId}/${requestId}`;
  return axios.post(postUrl).then(handler.handleResponse).catch(handler.handleError);
}

function rejectTripRequest(requestId) {
  const userId = getCurrentUserId();
  const postUrl = `/api/triprequest/reject/${userId}/${requestId}`;
  return axios.post(postUrl).then(handler.handleResponse).catch(handler.handleError);
}

function cancelTripRequest(requestId) {
  const userId = getCurrentUserId();
  const postUrl = `/api/triprequest/cancel/${userId}/${requestId}`;
  return axios.post(postUrl).then(handler.handleResponse).catch(handler.handleError);
}

const tripRequestServices = {
  create,
  getAllTripRequestForPassenger,
  getAllTripRequestForDriver,
  acceptTripRequest,
  rejectTripRequest,
  cancelTripRequest,
};

export default tripRequestServices;
