// @flow

const provinceService = require('../../../services/db-services/province-service');

function ProvinceController () {}

ProvinceController.prototype.getAll = async (req, res, next) => {
  try {
    const opStatus = await provinceService.getAll();
    res.json(opStatus);
  } catch (err) {
    next(err);
  }
};

module.exports = ProvinceController;
