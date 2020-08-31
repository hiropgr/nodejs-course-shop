const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const homeRouter = require('./routes/homeRouter')
const courseRouter = require('./routes/courseRouter');
const addRouter = require('./routes/addRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const authRouter = require('./routes/authRouter');

const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const MONGODB_URI = 'mongodb+srv://hiropgr:TYV4EFGWL2ZHeb7C@cluster0.r71tx.mongodb.net/courses?retryWrites=true&w=majority';
const store = new MongoDBStore({
    collection: 'sessions',
    uri: MONGODB_URI
});
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));

app.use(varMiddleware);
app.use(userMiddleware);

//TEMPLATE ENGINE SETUP
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
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

//DATABASE
async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
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

