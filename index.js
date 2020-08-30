const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');

const homeRouter = require('./routes/homeRouter')
const courseRouter = require('./routes/courseRouter');
const addRouter = require('./routes/addRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');

const User = require('./models/user');

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

//TEMPLATE ENGINE SETUP
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//TEMP
app.use(async (req, res) => {
    try {
        const user = await User.findById('5f4a874f4c1e782f8c8a7af9');
        req.user = user
        req.next();
    } catch (error) {
        console.log(error);        
    }
});

//ROUTES
app.use('/', homeRouter);
app.use('/courses', courseRouter);
app.use('/add', addRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);

//DATABASE
const url = 'mongodb+srv://hiropgr:TYV4EFGWL2ZHeb7C@cluster0.r71tx.mongodb.net/courses?retryWrites=true&w=majority';
async function start() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        const candidate = await User.findOne({});
        if(!candidate) {
            const user = new User({
                email: 'hiropgr@gmail.com',
                name: 'Askar',
                cart: {
                    items: []
                }
            });
            await user.save();
        }

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.log(error);        
    }
}
start();

