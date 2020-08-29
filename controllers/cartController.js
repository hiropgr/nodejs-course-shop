const Course = require('../models/course');

function computeTotalCost(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count
    }, 0);
}

function populateCartCourses(items) {
    return items.map(c => ({
        ...c.courseId._doc,
        count: c.count
    }));
}

exports.index = async (req, res) => {
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate();
    const courses = populateCartCourses(user.cart.items);
    const price = computeTotalCost(courses);
    
    res.render('cart', {
        title: 'Корзина',
        courses,
        price
    });
}

exports.addToCart = async (req, res) => {
    const course = await Course.findById(req.body.id);
    await req.user.addToCart(course);
    res.redirect('/cart');
}

exports.remove = async (req, res) => {
    const id = req.params.id;
    await req.user.removeFromCart(id);

    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate();
    const courses = populateCartCourses(user.cart.items);
    const price = computeTotalCost(courses);
    res.status(200).json({
        items: courses,
        price
    });
}