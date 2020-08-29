const Course = require('../models/course');

exports.index = (req, res) => {
    res.render('course-add', {
        title: 'Добавить курс'
    });
}

exports.add = async function (req, res) {
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        imageURL: req.body.imageURL
    });

    await course.save();
    res.redirect('/courses');
}