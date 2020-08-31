const express = require('express');
const controller = require('../controllers/addController');
const router = express.Router();
const middleware = require('../middleware/auth');
const {courseValidators} = require('../utils/validators');

router.get('/', middleware, controller.index);
router.post('/', middleware, courseValidators, controller.add);

module.exports = router;