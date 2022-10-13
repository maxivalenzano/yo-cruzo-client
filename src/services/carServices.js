/* eslint-disable no-underscore-dangle */
import axios from '../axios/axios';
import userHelpers from '../helpers/userHelpers';
import handler from '../helpers/handler';

function create(car) {
  const user = userHelpers.getCurrentSession();
  const postUrl = `/api/automovil/${user.id}`;
  return axios.post(postUrl, car)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function get(id) {
  const user = userHelpers.getCurrentSession();
  const getUrl = `/api/automovil/${user.id}/car/${id}`;
  return axios.get(getUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getAll() {
  const user = userHelpers.getCurrentSession();
  const getUrl = `/api/automovil/${user.id}/car`;
  return axios.get(getUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function update(car) {
  const user = userHelpers.getCurrentSession();
  const putUrl = `/api/user/${user.id}`;
  return axios.put(putUrl, car)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function deleteCar() {
  const user = userHelpers.getCurrentSession();
  const deleteUrl = `/api/user/${user.id}`;
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
