module.exports = ({ 
  status, 
  message = 'عملیات با موفقیت انجام شد.', 
  payload = null,
  errors = []
} = {}) => ({
  status,
  message, 
  payload,
  errors
});