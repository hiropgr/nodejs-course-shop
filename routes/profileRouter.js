const {Router} = require('express');
const controller = require('../controllers/profileController');
const router = Router();
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, controller.index);
router.post('/', authMiddleware, controller.update);

module.exports = router;