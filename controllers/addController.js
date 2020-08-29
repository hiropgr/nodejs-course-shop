const Course = require('../models/course');

exports.index = (req, res) => {
    res.render('course-add', {
        title: 'Добавить курс'
    });
}

exports.add = async function (req, res) {
    console.log(req.body);

    const course = new Course({
        title: req.body.title,
        price: req.body.price
    });

    await course.save();
    res.redirect('/courses');
}