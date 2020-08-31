const {Router} = require('express');
const controller = require('../controllers/orderController');
const router = Router();
const middleware = require('../middleware/auth');

router.get('/', middleware, controller.index);
router.post('/', middleware, controller.buy);

module.exports = router;