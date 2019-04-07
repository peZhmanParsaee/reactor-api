module.exports = ({ 
  status, 
  message = '', 
  payload = null,
  errors = []
} = {}) => ({
  status,
  message, 
  payload,
  errors
});