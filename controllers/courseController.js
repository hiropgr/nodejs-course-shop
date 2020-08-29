const Course = require('../models/course');

exports.index = async (req, res) => {
    const courses = await Course.find({}).lean();
    res.render('courses', {
        title: 'Курсы',
        courses
    });
};

exports.edit = async (req, res) => {
    const id = req.params.id
    const course = await Course.findById(id).lean();

    res.render('course-edit', {
        title: 'Редактировать курс',
        course
    });
};

exports.update = async (req, res) => {
    const id = req.body.id;
    const updObj = {
        title: req.body.title,
        price: req.body.price,
        imageURL: req.body.imageURL
    };
    await Course.findByIdAndUpdate(id, updObj); 
    res.redirect('/courses');
};

exports.getById = async (req, res) => {
    const id = req.params.id;
    const course = await Course.findById(id).lean();
    res.render('course', {
        title: `Курс ${course.title}`,
        course
    })
};

exports.delete = async (req, res) => {
    const id = req.body.id;
    await Course.remove({ _id: id });
    res.redirect('/courses');
}