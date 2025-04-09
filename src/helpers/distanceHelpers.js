import axios from 'axios';

export const calculateDistance = async (origin, destination) => {
  const apiKey = 'AIzaSyCDdOit0z643cb7uDBVZgKmKNKRQ3W6OiQ';
  const originCord = `${origin.coordinates.lat},${origin.coordinates.lng}`;
  const destinationCord = `${destination.coordinates.lat},${destination.coordinates.lng}`;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originCord}&destinations=${destinationCord}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const result = response.data;
    const dataMatrix = result.rows[0].elements[0];
    return dataMatrix;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
  return {};
};

export const calculateEstimatedPrice = (
  distanceMeters,
  fuelConsumption = 0.12,
  fuelPrice = 1600,
  tollBridge = 1000,
  profitPercentage = 0.25,
) => {
  const distanceKm = distanceMeters / 1000;
  const fuelCost = distanceKm * fuelConsumption * fuelPrice;
  const driverProfit = fuelCost * profitPercentage;
  return fuelCost + tollBridge + driverProfit;
};
