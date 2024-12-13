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
  const postUrl = `/api/triprequest/${user.id}`;
  return axios.get(postUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

const tripRequestServices = {
  create,
  getAllTripRequestForPassenger,
};

export default tripRequestServices;
