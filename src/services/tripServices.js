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

function getNearbyTrips(lat, lng, maxDistance = 10000, type = 'destination', status = 'OPEN', date = null) {
  let getUrl = `/api/trips/nearby?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}&type=${type}&status=${status}`;

  // Añadir el parámetro de fecha solo si está presente
  if (date) {
    getUrl += `&date=${date.toISOString()}`;
  }

  return axios.get(getUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function startTrip(tripId) {
  const putUrl = `/api/trip/${tripId}/start`;
  return axios.put(putUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function completeTrip(tripId) {
  const putUrl = `/api/trip/${tripId}/complete`;
  return axios.put(putUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getDriverTripsByStatus(status = 'ALL') {
  const userId = getCurrentUserId();
  const getUrl = `/api/trip/driver/${userId}/status/${status}`;
  return axios.get(getUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

const tripServices = {
  create,
  get,
  getAll,
  getTripByCity,
  getNearbyTrips,
  update,
  deleteTrip,
  startTrip,
  completeTrip,
  getDriverTripsByStatus,
};

export default tripServices;
