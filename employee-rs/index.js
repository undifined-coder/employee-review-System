const express = require('express'); // requiring express, 
const port = 5000; // assigning port
const app = express(); 

// requiring express-ejs-layout
const expressLayout = require('express-ejs-layouts');


// requring DataBase
const db = require('./config/mongoose');

const bodyParser = require('body-parser');

// Creating session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_strategy');

// requiring mongo-store
const MongoStore = require('connect-mongo');

// they are used for showing action notifications
const flash = require('connect-flash'); 
const flashMiddleWare = require('./config/flash_middleware');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./assets'));

// Setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(expressLayout);


// mongo store is used to store the session cookie in the db 
app.use(session({
    name: "ERS",
    // change secret during before deployment in production 
    secret: "employeeReviewSystem",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0:27017/employee_db',
        autoRemove: 'disabled'
    },
        (err) => {
            console.log(err || 'connect-mongo setup ok');
        }
    )
}))

// Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Using Connect flash
app.use(flash());
app.use(flashMiddleWare.setFlash);

app.use('/' , require('./routes'));


// Setting up the server at the given port
app.listen(port, function(err){
    if(err){
        console.log("Error in running the app.");
        return ;
    }
    console.log("Server is up and running at port ", + port);
});