const validationConstants = {
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
      message: 'La patente es requerido',
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
};
export default validationConstants;
