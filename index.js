const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

//TEMPLATE ENGINE SETUP
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//ROUTES
const homeRouter = require('./routes/homeRouter')

app.use('/', homeRouter);

//DATABASE
const url = 'mongo "mongodb+srv://hiropgr:TYV4EFGWL2ZHeb7C@cluster0.r71tx.mongodb.net/courses?retryWrites=true&w=majority';
async function start() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.log(error);        
    }
}
start()

