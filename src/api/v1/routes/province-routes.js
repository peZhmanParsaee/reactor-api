const express = require('express');
const router = express.Router();

const ProvinceController = require('../controllers/province-controller');
const _provinceController = new ProvinceController();

router.get('/', _provinceController.getAll);

module.exports = router;
