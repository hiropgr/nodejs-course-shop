const Course = require('../models/course');
const {validationResult} = require('express-validator');

function isOwner(course, req) {
    return course.userId.toString() === req.user._id.toString();
}

exports.index = async (req, res) => {
    try {
        const courses = await Course.find({}).lean();
        res.render('courses', {
            title: 'Courses list',
            courses,
            userId: req.user ? req.user._id.toString() : null
        });
    } catch (error) {
        console.log(error);        
    }
};

exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        const course = await Course.findById(id).lean();

        if(!isOwner(course, req))
            return res.redirect('/courses');
    
        res.render('course-edit', {
            title: 'Edit course',
            course,
            error: req.flash('error')
        });
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.body.id;
        const course = await Course.findById(id).lean();

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            req.flash('error', errors.array()[0].msg);
            return res.redirect(`/courses/${id}/edit`);
        }

        if(!isOwner(course, req))
            return res.redirect('/courses');
        
        const updObj = {
            title: req.body.title,
            price: req.body.price,
            imageURL: req.body.imageURL
        };
        await Course.findByIdAndUpdate(id, updObj); 
        res.redirect('/courses');
    } catch (error) {
        console.log(error);
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findById(id).lean();
        const userId = req.user ? req.user._id : null;
        res.render('course', {
            title: `Course ${course.title}`,
            course,
            userId
        })
    } catch (error) {
        console.log(error);
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.body.id;
        await Course.deleteOne({
            _id: id,
            userId: req.user._id
        });
        res.redirect('/courses');
    } catch (error) {
        console.log(error);        
    }
}