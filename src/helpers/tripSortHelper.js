import dayjs from 'dayjs';

// Tipos de ordenamiento
export const SORT_TYPES = {
  DISTANCE: 'distance',
  RECENT: 'recent',
  OLDEST: 'oldest',
};

// Opciones para el ActionSheet
export const SORT_OPTIONS = ['Distancia más cercana', 'Fecha más próxima', 'Fecha más lejana', 'Cancelar'];
export const CANCEL_INDEX = 3;
export const SORT_TITLE = 'Ordenar por';

// Obtiene el texto descriptivo según el tipo de ordenamiento
export const getSortOrderText = (sortOrder) => {
  switch (sortOrder) {
    case SORT_TYPES.DISTANCE:
      return 'Distancia más cercana';
    case SORT_TYPES.RECENT:
      return 'Fecha más próxima';
    case SORT_TYPES.OLDEST:
      return 'Fecha más lejana';
    default:
      return 'Distancia más cercana';
  }
};

// Función principal para ordenar viajes
export const sortTrips = (trips, sortOrder) => {
  if (!trips?.length) return [];

  const tripsCopy = [...trips];

  switch (sortOrder) {
    case SORT_TYPES.DISTANCE:
      return tripsCopy.sort((a, b) => {
        // Ordenar por distancia (valor más bajo primero)
        const distanceA = a.distance || Number.MAX_SAFE_INTEGER;
        const distanceB = b.distance || Number.MAX_SAFE_INTEGER;
        return distanceA - distanceB;
      });

    case SORT_TYPES.RECENT:
      return tripsCopy.sort((a, b) => {
        const dateA = dayjs(a.tripDate);
        const dateB = dayjs(b.tripDate);
        return dateB.isAfter(dateA) ? -1 : 1;
      });

    case SORT_TYPES.OLDEST:
      return tripsCopy.sort((a, b) => {
        const dateA = dayjs(a.tripDate);
        const dateB = dayjs(b.tripDate);
        return dateA.isAfter(dateB) ? -1 : 1;
      });

    default:
      return tripsCopy;
  }
};
