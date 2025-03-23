/* eslint-disable no-underscore-dangle */
import axios from '../axios/axios';
import userHelpers from '../helpers/userHelpers';
import handler from '../helpers/handler';

function create(trip) {
  const user = userHelpers.getCurrentSession();
  const postUrl = `/api/triprequest/${user.id}/${trip.id}`;
  return axios.post(postUrl, trip)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getAllTripRequestForPassenger() {
  const user = userHelpers.getCurrentSession();
  const postUrl = `/api/triprequest/passenger/${user.id}`;
  return axios.get(postUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getAllTripRequestForDriver() {
  const user = userHelpers.getCurrentSession();
  const postUrl = `/api/triprequest/driver/${user.id}`;
  return axios.get(postUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function acceptTripRequest(requestId) {
  const user = userHelpers.getCurrentSession();
  const postUrl = `/api/triprequest/accept/${user.id}/${requestId}`;
  return axios.post(postUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function cancelTripRequest(requestId) {
  const user = userHelpers.getCurrentSession();
  const postUrl = `/api/triprequest/reject/${user.id}/${requestId}`;
  return axios.post(postUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

const tripRequestServices = {
  create,
  getAllTripRequestForPassenger,
  getAllTripRequestForDriver,
  acceptTripRequest,
  cancelTripRequest,
};

export default tripRequestServices;
