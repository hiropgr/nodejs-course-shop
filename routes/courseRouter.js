const express = require('express');
const controller = require('../controllers/courseController');
const router = express.Router();
const middleware = require('../middleware/auth');

router.get('/', controller.index);
router.get('/:id', controller.getById);
router.get('/:id/edit', middleware, controller.edit);
router.post('/edit', middleware, controller.update);
router.post('/delete', middleware, controller.delete);

module.exports = router;