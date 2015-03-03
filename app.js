var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var app = express();
var config = require('./config');
// var AV = require('avoscloud-sdk').AV;
// AV.initialize(config.avos_app_id, config.avos_app_key);
// var Paper_index = require('./models/Paper_index');
// var Paper_En = AV.Object.extend('ENGLISH');

// var answer = [
//     'C', 'A', 'B', 'A', 'B', 'A', 'C', 'A', 'C', 'B', 'B', 'A', 'B', 'A', 'C', 'C', 'B', 'A', 'A', 'C', 'modern', 'Water pollution', 'Air pollution', 'throwing', 'the same car',
//     'B', 'D', 'B', 'D', 'A', 'B', 'B', 'C', 'B', 'B', 'D', 'B', 'D', 'B', 'A', 'A', 'A', 'C', 'C', 'C',
//     'C', 'B', 'A', 'D', 'A', 'B', 'C', 'A', 'B', 'D',
//     'A', 'C', 'D', 'D', 'A', 'B', 'C', 'C', 'A', 'C', 'D', 'C', 'F', 'E', 'A',
//     'because/as/since', 'All', 'wife', 'so', 'out', 'hotel', 'driver', 'do', 'post', 'telegram',
//     'easy', 'pay', 'quality', 'safe', 'communicate',
//     'Dear fellow students,<br>&nbsp;&nbsp;&nbsp;&nbsp;Forests are important to the environment. But more and more forests are disappearing around the world every year. That is because of people’s cutting down trees and kinds of pollution like farming and tourism pollution and so on. As we know, trees are very useful to the environment. They can keep the water and stop the soil from washing away. They can cool the air and make our cities less noisy. Trees can prevent the climate from getting warmer and warmer. They can keep the balance of nature. Without trees, humans and animals would die. So we must protect trees, plant more trees and take care of them.<br>&nbsp;&nbsp;&nbsp;&nbsp;In order to protect our environment, our school is planning an activity “Plant Trees for the Earth”. Let’s join in the activity together.<br>&nbsp;&nbsp;&nbsp;&nbsp;That’s all. Thank you.'
// ];
// var paper_index = new Paper_index('ENGLISH').newPaper('英语月考3');
// for (var i = 0; i < 25; i++) {
//     console.log(111);
//     var paper = new Paper_En();
//     paper.save({
//         ExamPaperName: '英语月考3',
//         type: '听力理解',
//         number: i + 1,
//         answer: answer[i],
//         content: '',
//         comment: 0
//     });
//     paper_index.set(i+1, paper);
// }

// for (var i = 25; i < 45; i++) {
//     var paper = new Paper_En();
//     paper.save({
//         ExamPaperName: '英语月考3',
//         type: '单项选择',
//         number: i + 1,
//         answer: answer[i],
//         content: '',
//         comment: 0
//     });
//     paper_index.set(i+1, paper);
// }

// for (var i = 45; i < 55; i++) {
//     var paper = new Paper_En();
//     paper.save({
//         ExamPaperName: '英语月考3',
//         type: '完形填空',
//         number: i + 1,
//         answer: answer[i],
//         content: '',
//         comment: 0
//     });
//     paper_index.set(i+1, paper);
// }

// for (var i = 55; i < 70; i++) {
//     var paper = new Paper_En();
//     paper.save({
//         ExamPaperName: '英语月考3',
//         type: '阅读理解',
//         number: i + 1,
//         answer: answer[i],
//         content: '',
//         comment: 0
//     });
//     paper_index.set(i+1, paper);
// }

// for (var i = 70; i < 80; i++) {
//     var paper = new Paper_En();
//     paper.save({
//         ExamPaperName: '英语月考3',
//         type: '综合填空',
//         number: i + 1,
//         answer: answer[i],
//         content: '',
//         comment: 0
//     });
//     paper_index.set(i+1, paper);
// }

// for (var i = 80; i < 85; i++) {
//     var paper = new Paper_En();
//     paper.save({
//         ExamPaperName: '英语月考3',
//         type: '信息归纳',
//         number: i + 1,
//         answer: answer[i],
//         content: '',
//         comment: 0
//     });
//     paper_index.set(i+1, paper);
// }

// for (var i = 85; i < 86; i++) {
//     var paper = new Paper_En();
//     paper.save({
//         ExamPaperName: '英语月考3',
//         type: '作文题',
//         number: i + 1,
//         answer: answer[i],
//         content: '',
//         comment: 0
//     });
//     paper_index.set(i+1, paper);
// }
// paper_index.save();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
    secret: config.cookie_secret,
    key: config.cookie_key,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1
    }
}));

app.use('/', require('./routes/index'));
app.use('/signin', require('./routes/signin'));
app.use('/admin', require('./routes/admin'));
app.use('/resource', require('./routes/resource'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;