const {Router} = require('express');
const controller = require('../controllers/orderController');
const router = Router();

router.get('/', controller.index);
router.post('/', controller.buy);

module.exports = router;