const Order = require('../models/order');

exports.index = async (req, res) => {
    try {
        let orders = await Order.find({
            'user.userId': req.user._id
        }).populate('user.userId').lean();
        orders = orders.map(o => ({
            ...o,
            price: o.courses.reduce((total, c) => {
                return total += c.course.price * c.count
            }, 0)
        }));

        res.render('orders', {
            title: 'Orders',
            orders: orders
        });
    } catch (error) {
        console.log(error);        
    }
}

exports.buy = async (req, res) => {
    try {
        const user = await req.user
            .populate('cart.items.courseId')
            .execPopulate();
        const courses = user.cart.items.map(c => ({
            count: c.count,
            course: c.courseId._doc
        }));
    
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            courses
        });
    
        await order.save();
        await req.user.clearCart();
        res.redirect('/orders');
    } catch (error) {
        console.log(error);        
    }
}