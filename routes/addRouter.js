const express = require('express');
const controller = require('../controllers/addController');
const router = express.Router();
const middleware = require('../middleware/auth');

router.get('/', middleware, controller.index);
router.post('/', middleware, controller.add);

module.exports = router;