const express = require('express');
const controller = require('../controllers/addController');
const router = express.Router();

router.get('/', controller.index);
router.post('/', controller.add);

module.exports = router;