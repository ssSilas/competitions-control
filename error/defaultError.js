export default function errorObject(error, options = {}) {
  const {
    defaultMessage = 'Erro desconhecido',
    defaultStatus = 500,
    defaultError = 'Error',
  } = options;

  const customErrorObject = {
    message: error.message || defaultMessage,
    status: error.status || defaultStatus,
    error: error.error || defaultError,
  };

  return customErrorObject;
}