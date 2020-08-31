const {body} = require('express-validator');
const User = require('../models/user');

exports.registerValidators = [
    body('email', 'Incorrect email value')
        .isEmail()
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({ email: value });
                if(user)
                    return Promise.reject('Email is already in use')
            } catch (error) {
                console.log(errr);
            }
        })
        .normalizeEmail(),
    body('name', 'Min length of name is 3 symbols')
        .isLength({min: 3})
        .trim(),
    body('password', 'Incorrect format of password')
        .isLength({min: 6, max: 36})
        .isAlphanumeric()
        .trim(),
    body('confirmPassword')
        .custom((value, {req}) => {
            if(value !== req.body.password)
                throw new Error('Passwords are not equal');
            return true;
        })
        .trim()
]

exports.authValidators = [
    body('email')
        .normalizeEmail()
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({ email: value })
                if(!user)
                    return Promise.reject('User is not registered');
            } catch (error) {
                console.log(error);
            }
        })
]

module.exports.courseValidators = [
    body('title', 'Min length of title is 3 symbols, max is 50')
        .isLength({min: 3, max: 50})
        .trim(),
    body('price', 'Incorrect format of price')
        .isNumeric(),
    body('imageURL', 'Incorrect format of image URL')
        .isURL()
        .trim()
]