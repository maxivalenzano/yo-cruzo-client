/* eslint-disable no-underscore-dangle */
import axios from '../axios/axios';
import handler from '../helpers/handler';
import { getCurrentUserId } from '../helpers/authHelpers';

function create(car) {
  const userId = getCurrentUserId();

  const postUrl = `/api/car/${userId}`;
  return axios.post(postUrl, car)
    .then((response) => handler.handleResponse(response))
    .catch((error) => handler.handleError(error));
}

function get(id) {
  const getUrl = `/api/car/${id}`;
  return axios.get(getUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getAll() {
  const userId = getCurrentUserId();

  const getUrl = `/api/car/${userId}`;
  return axios.get(getUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function update(car) {
  const putUrl = `/api/car/${car.id}`;
  return axios.put(putUrl, car)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function deleteCar(idCar) {
  const userId = getCurrentUserId();

  const deleteUrl = `/api/car/${userId}/${idCar}`;
  return axios.delete(deleteUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

const carServices = {
  create,
  get,
  getAll,
  update,
  deleteCar,
};

export default carServices;
