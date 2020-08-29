const express = require('express');
const controller = require('../controllers/courseController');
const router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.getById);
router.get('/:id/edit', controller.edit);
router.post('/edit', controller.update);
router.post('/delete', controller.delete);

module.exports = router;