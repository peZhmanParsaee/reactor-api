const ProvinceService = require('../../../services/db-services/province-service');
const _provinceService = new ProvinceService();

function ProvinceController () {}

ProvinceController.prototype.getAll = async (req, res, next) => {
  try {
    const opStatus = await _provinceService.getAll();
    res.json(opStatus);
  } catch (err) {
    next(err);
  }
}

module.exports = ProvinceController;
