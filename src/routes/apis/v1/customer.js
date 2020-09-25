const express = require('express');
const controller = require('../../../area/customer/controller');

const router = express.Router();

router.get('/', controller.getAll);

router.get('/search', controller.search);

module.exports = router;
