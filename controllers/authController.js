const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

exports.loginPage = (req, res) => {
    res.render('auth/login', {
        title: 'Sign in',
        layout: 'empty',
        error: req.flash('error')
    });
}

exports.regPage = (req, res) => {
    res.render('auth/reg', {
        title: 'Sign up',
        layout: 'empty',
        error: req.flash('error')
    });
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            req.flash('error', errors.array()[0].msg);
            return res.status(422)
                .redirect('/auth/signin');
        }

        const user = await User.findOne({ email });
        const isCorrectPassword = await bcryptjs.compare(password, user.password);
        if(isCorrectPassword) {
            req.session.user = user
            req.session.isAuthenticated = true;
            req.session.save(err => {
                if(err) throw err
                res.redirect('/');
            });
        } 
        else {
            req.flash('error', 'Password is wrong')
            res.redirect('/auth/signin');
        }
    } catch (error) {
        console.log(error);
    }
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

exports.register = async (req, res) => {
    try {
        const {email, password, name} = req.body
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(422)
                .render('auth/reg', {
                    title: 'Sign up',
                    layout: 'empty',
                    error: errors.array()[0].msg,
                    data: {
                        email, name
                    }
                });
        }

        const hashPassword = await bcryptjs.hash(password, 10)
        const user = new User({
            email, password: hashPassword, name
        });
        user.save();
        res.redirect('/auth/signin');
    } catch (error) {
        console.log(error);
    }
}