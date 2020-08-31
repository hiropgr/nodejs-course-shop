const {Router} = require('express');
const controller = require('../controllers/authController');
const router = Router();

router.get('/signin', controller.loginPage);
router.get('/signup', controller.regPage);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/logout', controller.logout);

module.exports = router;