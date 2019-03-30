module.exports = ({ 
  status, 
  message = 'عملیات با موفقیت انجام شد.', 
  payload = null
} = {}) => ({
  status,
  message, 
  payload
});