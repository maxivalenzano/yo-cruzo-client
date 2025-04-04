const validationConstants = {
  selectedCar: {
    required: {
      value: true,
      message: 'Debes seleccionar un auto',
    },
  },
  tripDate: {
    required: {
      value: true,
      message: 'Debes seleccionar una fecha',
    },
  },
  tripTime: {
    required: {
      value: true,
      message: 'Debes seleccionar una hora',
    },
  },
  origin: {
    required: {
      value: true,
      message: 'Debes indicar un punto de origen',
    },
    validate: (value) => Boolean(value.coordinates) || 'Debes seleccionar una ubicación válida como origen',
  },
  destination: {
    required: {
      value: true,
      message: 'Debes indicar un punto de destino',
    },
    validate: (value) => Boolean(value.coordinates) || 'Debes seleccionar una ubicación válida como destino',
  },
  capacity: {
    required: {
      value: true,
      message: 'Debes indicar el número de asientos disponibles',
    },
  },
  marca: {
    required: {
      value: true,
      message: 'Debes ingresar la marca del vehículo',
    },
    maxLength: {
      value: 20,
      message: 'La marca no puede superar los 20 caracteres',
    },
  },
  modelo: {
    required: {
      value: true,
      message: 'Debes ingresar el modelo del vehículo',
    },
    maxLength: {
      value: 20,
      message: 'El modelo no puede superar los 20 caracteres',
    },
  },
  patente: {
    required: {
      value: true,
      message: 'Debes ingresar la patente del vehículo',
    },
    pattern: {
      value: /^[a-zA-Z]{2,2}[0-9]{3,3}[a-zA-Z]{2,2}|[a-zA-Z]{3,3}[0-9]{3,3}$/i,
      message: 'El formato de la patente no es válido',
    },
  },
  color: {
    required: {
      value: true,
      message: 'Debes indicar el color del vehículo',
    },
  },
  name: {
    required: {
      value: true,
      message: 'Debes ingresar tu nombre y apellido',
    },
  },
  firstName: {
    required: {
      value: true,
      message: 'Debes ingresar tu nombre',
    },
  },
  lastName: {
    required: {
      value: true,
      message: 'Debes ingresar tu apellido',
    },
  },
  email: {
    required: {
      value: true,
      message: 'Debes ingresar tu correo electrónico',
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'El formato del correo electrónico no es válido',
    },
  },
  dni: {
    required: {
      value: true,
      message: 'Debes ingresar tu número de DNI',
    },
    pattern: {
      value: /^[0-9]{7,8}$/i,
      message: 'El DNI debe contener 7 u 8 números',
    },
  },
  address: {
    required: {
      value: true,
      message: 'Debes ingresar tu dirección',
    },
  },
  birthdate: {
    required: {
      value: true,
      message: 'Debes seleccionar tu fecha de nacimiento',
    },
  },
  userName: {
    required: {
      value: true,
      message: 'Debes ingresar un nombre de usuario',
    },
    pattern: {
      value: /^[a-zA-Z0-9]{4,20}$/i,
      message: 'El nombre de usuario debe contener entre 4 y 20 caracteres alfanuméricos',
    },
  },
  // Reglas para login
  loginPassword: {
    required: {
      value: true,
      message: 'Debes ingresar tu contraseña',
    },
  },
  loginEmail: {
    required: {
      value: true,
      message: 'Debes ingresar tu correo electrónico',
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'El formato del correo electrónico no es válido',
    },
  },
  // Reglas para registro
  registerPassword: {
    required: {
      value: true,
      message: 'Debes ingresar tu contraseña',
    },
    pattern: {
      value: /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
      message:
        'Tu contraseña debe contener una mayúscula, una minúscula, un número y un caracter especial',
    },
    minLength: {
      value: 8,
      message: 'Tu contraseña debe contener al menos 8 caracteres',
    },
  },
  registerEmail: {
    required: {
      value: true,
      message: 'Debes ingresar tu correo electrónico',
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'El formato del correo electrónico no es válido',
    },
  },
};

export default validationConstants;
