/* eslint-disable no-underscore-dangle */
import axios from '../axios/axios';
import handler from '../helpers/handler';
import { getCurrentUserId } from '../helpers/authHelpers';

function create(trip) {
  const userId = getCurrentUserId();
  const postUrl = `/api/trip/${userId}`;
  return axios.post(postUrl, trip)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function get(id) {
  const getUrl = `/api/trip/${id}`;
  return axios.get(getUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getAll() {
  const userId = getCurrentUserId();
  const getUrl = `/api/trip/${userId}`;
  return axios.get(getUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function update(trip) {
  const putUrl = `/api/trip/${trip.id}`;
  return axios.put(putUrl, trip)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function deleteTrip(idTrip) {
  const userId = getCurrentUserId();
  const deleteUrl = `/api/trip/${userId}/${idTrip}`;
  return axios.delete(deleteUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getTripByCity(city, status) {
  const getUrl = `/api/trip/from/${city}/status/${status || 'OPEN'}`;
  return axios.get(getUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

const tripServices = {
  create,
  get,
  getAll,
  getTripByCity,
  update,
  deleteTrip,
};

export default tripServices;
