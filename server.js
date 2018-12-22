const express = require("express");
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toDateString();
    var log = `${now}: ${req.method}: ${req.path}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
})

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
    res.send('welcome');
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear(),
    });
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Home Page of my website',
        currentYear: new Date().getFullYear(),
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})