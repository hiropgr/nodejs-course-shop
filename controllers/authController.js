const User = require('../models/user');
const bcryptjs = require('bcryptjs');

exports.loginPage = (req, res) => {
    res.render('auth/login', {
        title: 'Sign in',
        layout: 'empty'
    });
}

exports.regPage = (req, res) => {
    res.render('auth/reg', {
        title: 'Sign in',
        layout: 'empty'
    });
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({ email });

        if(candidate) {
            const isCorrectPassword = await bcryptjs.compare(password, candidate.password);
            if(isCorrectPassword) {
                req.session.user = candidate
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if(err) throw err
                    res.redirect('/');
                });
            } 
            else 
                res.redirect('/auth/signin');
        } 
        else
            res.redirect('/auth/signin');
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
        const {email, password, confirmPassword, name} = req.body
        const candidate = await User.findOne({ email })
    
        if(candidate)
            res.redirect('/auth/signin');
        else {
            const hashPassword = await bcryptjs.hash(password, 10)
            const user = new User({
                email, password: hashPassword, name
            });
            user.save();
            res.redirect('/auth/signin');
        }
    } catch (error) {
        console.log(error);
    }
}