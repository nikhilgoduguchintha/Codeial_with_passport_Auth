const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle:'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store(mongo connect) is used to store the session cookie in the db
app.use(session({
    name: 'Codeial',
    // todo change the secret before deployement in prod
    secret: 'blahSomething',
    saveUninitialized: false,
    resave:false,
    cookie:{
        // it's in milli seconds
        maxAge:(1000 * 60 *100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development_main',
        autoRemove: 'disable',
        touchAfter: 1 * 3600
    },
    function(err){
        console.log(err || 'Connect -mongodb setup ok' )
    }
    )
}));
// say app to use passport
app.use(passport.initialize());
// say app to use session
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// use express router
app.use('/', require('./routes'));


app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
