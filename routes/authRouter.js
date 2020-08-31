const {Router} = require('express');
const controller = require('../controllers/authController');
const router = Router();
const {registerValidators, authValidators} = require('../utils/validators');

router.get('/signin', controller.loginPage);
router.get('/signup', controller.regPage);
router.post('/login', authValidators, controller.login);
router.post('/register', registerValidators, controller.register);
router.get('/logout', controller.logout);

module.exports = router;