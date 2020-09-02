const Course = require('../models/course');
const {validationResult} = require('express-validator');

exports.index = (req, res) => {
    res.render('courses/add', {
        title: 'Add course'
    });
}

exports.add = async function (req, res) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).render('courses/add', {
            title: 'Add course',
            error: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
                imageURL: req.body.imageURL,
            }
        });
    }

    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        imageURL: req.body.imageURL,
        userId: req.user
    });

    await course.save();
    res.redirect('/courses');
}