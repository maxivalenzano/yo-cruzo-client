/* eslint-disable no-underscore-dangle */
import axios from '../axios/axios';
import userHelpers from '../helpers/userHelpers';
import handler from '../helpers/handler';

function create(trip) {
  const user = userHelpers.getCurrentSession();
  const postUrl = `/api/trip/${user.id}`;
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
  const user = userHelpers.getCurrentSession();
  const getUrl = `/api/trip/${user.id}`;
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
  const user = userHelpers.getCurrentSession();
  const deleteUrl = `/api/trip/${user.id}/${idTrip}`;
  return axios.delete(deleteUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getTripByCity(city) {
  const getUrl = `/api/trip/from/${city}`;
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
