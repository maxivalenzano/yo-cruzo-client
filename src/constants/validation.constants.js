const validationConstants = {
  selectedCar: {
    required: {
      value: true,
      message: 'Debe seleccionar un auto',
    },
  },
  tripDate: {
    required: {
      value: true,
      message: 'Debe seleccionar una fecha',
    },
  },
  tripTime: {
    required: {
      value: true,
      message: 'Debe seleccionar una hora',
    },
  },
  origin: {
    required: {
      value: true,
      message: 'Debe cargar un origen',
    },
    validate: (value) => Boolean(value.coordinates) || 'Debe cargar un origen',
  },
  destination: {
    required: {
      value: true,
      message: 'Debe cargar un destino',
    },
    validate: (value) => Boolean(value.coordinates) || 'Debe cargar un destino',
  },
  capacity: {
    required: {
      value: true,
      message: 'Debe seleccionar la cantidad de asientos',
    },
  },
  marca: {
    required: {
      value: true,
      message: 'La marca es requerida',
    },
    maxLength: {
      value: 20,
      message: 'Máximo de caracteres superado',
    },
  },
  modelo: {
    required: {
      value: true,
      message: 'El modelo es requerido',
    },
    maxLength: {
      value: 20,
      message: 'Máximo de caracteres superado',
    },
  },
  patente: {
    required: {
      value: true,
      message: 'La patente es requerida',
    },
    pattern: {
      value: /^[a-zA-Z]{2,2}[0-9]{3,3}[a-zA-Z]{2,2}|[a-zA-Z]{3,3}[0-9]{3,3}$/i,
      message: 'Patente inválida',
    },
  },
  color: {
    required: {
      value: true,
      message: 'El color del auto es requerido',
    },
  },
  name: {
    required: {
      value: true,
      message: 'El apellido y nombre es requerido',
    },
  },
  email: {
    required: {
      value: true,
      message: 'El email es requerido',
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Email inválido',
    },
  },
  dni: {
    required: {
      value: true,
      message: 'El DNI es requerido',
    },
    pattern: {
      value: /^[0-9]{7,8}$/i,
      message: 'DNI inválido',
    },
  },
  address: {
    required: {
      value: true,
      message: 'La dirección es requerida',
    },
  },
  birthdate: {
    required: {
      value: true,
      message: 'La fecha de nacimiento es requerida',
    },
  },
  userName: {
    required: {
      value: true,
      message: 'El nombre de usuario es requerido',
    },
    pattern: {
      value: /^[a-zA-Z0-9]{4,20}$/i,
      message: 'Usuario inválido',
    },
  },

};
export default validationConstants;
