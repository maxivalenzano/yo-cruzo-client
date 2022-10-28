/* eslint-disable no-underscore-dangle */
import axios from '../axios/axios';
import userHelpers from '../helpers/userHelpers';
import handler from '../helpers/handler';

function create(car) {
  const user = userHelpers.getCurrentSession();
  const postUrl = `/api/car/${user.id}`;
  return axios.post(postUrl, car)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function get(id) {
  const getUrl = `/api/car/${id}`;
  return axios.get(getUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getAll() {
  const user = userHelpers.getCurrentSession();
  const getUrl = `/api/car/${user.id}`;
  return axios.get(getUrl)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function update(car) {
  const user = userHelpers.getCurrentSession();
  const putUrl = `/api/car/${user.id}/${car._id}`;
  return axios.put(putUrl, car)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function deleteCar(idCar) {
  const user = userHelpers.getCurrentSession();
  const deleteUrl = `/api/car/${user.id}/${idCar}`;
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
