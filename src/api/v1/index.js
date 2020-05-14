const customerRoutes = require('./routes/customer-routes');
const provinceRoutes = require('./routes/province-routes');
const productRoutes = require('./routes/product-routes');
const invoiceRoutes = require('./routes/invoice-routes');

module.exports = app => {
  app.use('/api/v1/customer', customerRoutes);
  app.use('/api/v1/province', provinceRoutes);
  app.use('/api/v1/product', productRoutes);
  app.use('/api/v1/invoice', invoiceRoutes);
};
