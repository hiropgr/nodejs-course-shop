const User = require('../models/user');

exports.index = (req, res) => {
    res.render('profile', {
        title: 'Profile',
        user: req.user.toObject()
    });
}

exports.update = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const updateObj = {
            name: req.body.name,
        };
        if(req.file) {
            updateObj.avatarURL = req.file.path
        }
        Object.assign(user, updateObj);
        await user.save();
        res.redirect('/profile');
    } catch (error) {
        console.log(error);
    }
}