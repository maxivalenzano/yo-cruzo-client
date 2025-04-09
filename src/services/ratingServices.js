import axios from '../axios/axios';
import handler from '../helpers/handler';

function rateDriver(tripId, ratingData) {
  const url = `/api/rating/${tripId}`;
  return axios.post(url, ratingData)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

function getDriverRatings(driverId) {
  const url = `/api/rating/${driverId}`;
  return axios.get(url)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

const ratingServices = {
  rateDriver,
  getDriverRatings,
};

export default ratingServices;
