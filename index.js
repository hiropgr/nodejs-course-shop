const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const flash = require('connect-flash');
const keys = require('./keys');
const hbshelpers = require('./utils/hbs-helper');

const homeRouter = require('./routes/homeRouter')
const courseRouter = require('./routes/courseRouter');
const addRouter = require('./routes/addRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');

const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const errorMiddleware = require('./middleware/error');
const fileMiddleware = require('./middleware/file');

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))

const store = new MongoDBStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
});
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));

app.use(csurf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);
app.use(fileMiddleware.single('avatar'));

//TEMPLATE ENGINE SETUP
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: hbshelpers
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//ROUTES
app.use('/', homeRouter);
app.use('/courses', courseRouter);
app.use('/add', addRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.use(errorMiddleware);

//DATABASE
async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.log(error);        
    }
}
start();

