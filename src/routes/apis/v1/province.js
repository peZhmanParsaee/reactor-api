const express = require('express');
const router = express.Router();

const controller = require('../../../area/province/controller');

router.get('/', controller.getAll);

module.exports = router;
