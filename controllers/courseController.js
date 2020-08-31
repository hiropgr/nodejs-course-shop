const Course = require('../models/course');

function isOwner(course, req) {
    return course.userId.toString() === req.user._id.toString();
}

exports.index = async (req, res) => {
    try {
        const courses = await Course.find({}).lean();
        res.render('courses', {
            title: 'Курсы',
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
            title: 'Редактировать курс',
            course
        });
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (req, res) => {
    try {
        const course = await Course.findById(id).lean();
        if(!isOwner(course, req))
            return res.redirect('/courses');
        
        const id = req.body.id;
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
        res.render('course', {
            title: `Курс ${course.title}`,
            course
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